const { createClient } = supabase;
const supaurl = 'https://plsiicrtbryicuagbfly.supabase.co';
const supakey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2lpY3J0YnJ5aWN1YWdiZmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MjU0MzYsImV4cCI6MjAxNjUwMTQzNn0.QdztP5iLKcRzhQ7KESr9TXyjFjlF07k56TXJgPs0BjQ';
const supa = createClient(supaurl, supakey);

const {markedHighlight} = globalThis.markedHighlight;
marked.use(markedDirective.createDirectives());
marked.use(markedLinkifyIt({},{}));
marked.use(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            const addon = `<div class='language'>${language}</div>`;
            return hljs.highlight(code, {
                language
            }).value + addon;
        },
    }),
);
marked.use({breaks: true});

var uid;

setLoadComplete(function () {
    loadArticleList();
    // listenHash(loadArticle);
    listenColorScheme(loadColorScheme);

    supa.auth.getUser().then(res => {
        if( !res.error ) {
            window.uid = res.data.user.id;
        }
        if( !window.uid ) {
            document.querySelector('#comment-content').setAttribute('placeholder','로그인 후 이용할 수 있습니다.');
            document.querySelector('#comment-content').setAttribute('disabled',true);
        }
    });

    supa.channel('comments-changes').on('postgres_changes',
        {event: '*', schema: 'public', table: 'comments',},
        (payload) => {
            if( payload.eventType=='INSERT' ) {
                newComment(payload.new);
            }
            else if( payload.eventType=='DELETE' ) {
                document.querySelector(`div#comment-${payload.old.id}`).remove();
            }
        },
    ).subscribe();

    document.querySelector('#comment-save').addEventListener('click', insertComment);
    document.querySelector('#comment-content').addEventListener('focus', function() {
        this.classList.add('on');
    })
    // document.querySelector('#comment-content').addEventListener('blur', function() {
    //     this.classList.remove('on');
    // })
    document.querySelector('#comment-content').addEventListener('keyup', function(evt) {
        if( evt.ctrlKey && evt.key=='Enter' ) {
            insertComment();
        }
    })
});
function loadColorScheme(scheme) {
    document.querySelector('link#highlightjs_css')?.remove();
    const newcss = document.createElement('link');
    newcss.setAttribute('id','highlightjs_css');
    newcss.setAttribute('rel','stylesheet');
    newcss.setAttribute('href',`/scripts/stackoverflow-${scheme}.min.css`);
    document.querySelector('head').append(newcss);
}

function loadArticleList() {
    const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
    const articleSection = document.querySelector('section#articles');
    let maArticleIdx = 0;
    fetch('/articles/list.dat',{
        mode: 'no-cors'
    }).then((res) => {
        if (res.ok) {
            res.text().then((d) => {
                d.split('\n').reverse().forEach((line) => {
                    if (line.trim()) {
                        const [idx, writeAt, categorys, title] = line.split('|');
                        if (maArticleIdx == 0) {
                            maArticleIdx = idx;
                        }
                        const newArticle = document.createElement('article');
                        newArticle.setAttribute('id', `article-${idx}`);
                        newArticle.innerHTML = articleTemplate.replace('{article-writeAt}', writeAt).replace('{article-title}', title);
                        let newIconHTML = '';
                        categorys.split(',').forEach((c) => {
                            const newIcon = document.createElement('img');
                            newIcon.setAttribute('src', `/icons/${c.trim()}.svg`);
                            newIcon.classList.add('articleIcon');
                            newIconHTML += newIcon.outerHTML;
                        });
                        newArticle.innerHTML = newArticle.innerHTML.replace('{article-icons}',newIconHTML);
                        newArticle.addEventListener('click', () => {
                            // setHash('articleId', idx);
                            location.search = `?${idx}`;
                        });
                        articleSection.append(newArticle);
                    }
                });
                loadArticle(location.search?null:maArticleIdx);
            });
        }
    });
}
function activeArticle(articleId) {
    if( articleId > 0 ) {
        try {
            document.querySelectorAll(`section#articles > article`).forEach(a => a.classList.remove('on'));
            document.querySelector(`section#articles > article#article-${articleId}`).classList.add('on');
            document.title = 'allstack document- '+document.querySelector(`section#articles > article#article-${articleId} > span.articleTitle`).innerText;
        } catch (error) {
        }
    }
}
function loadArticle(maArticleId) {
    let articleId;
    if( !location.search && maArticleId ) {
        articleId = maArticleId;
    }
    else {
        articleId = location.search.substring(1);
    }
    if( articleId ) {
        document.querySelector('#comment-save').dataset.articleId = articleId;
        showLoading();
        fetch(`/articles/article_${articleId}.md`).then((res) => {
            if (res.ok) {
                activeArticle(articleId);
                res.text().then((d) => {
                    // document.getElementById('contents').innerHTML = DOMPurify.sanitize(
                    //     marked.parse(d),
                    // );
                    document.getElementById('contents').innerHTML = `<div class="reveal-link"><a href="/reveal.html?${articleId}">SLIDESHOW</a></div>`+marked.parse(d);
                    let matches;
                    if( matches=document.getElementById('contents').innerHTML.match(/\<script src=([^\>]+)\>\s*\<\/script\>/gmi) ) {
                        matches.forEach(m => {
                            let s = m.split('src=');
                            s = s[1].split('>');
                            const u = s[0].match(/[\/a-z0-9\._]+/);
                            const newjs = document.createElement('script');
                            newjs.setAttribute('src', u[0]);
                            document.body.append(newjs);
                        });
                    }
                    // load comment
                    supa.from('comments').select().eq('article_id',articleId).then(res => {
                        if( !res.error ) {
                            res.data.forEach(d => {
                                newComment(d);
                            });
                        }
                    });
                    window.scrollTo(0, 0);
                    gtag('event', 'article_view', {
                        articleId: articleId,
                        result: 'success',
                    });
                    hideLoading();
                });
            } else {
                gtag('event', 'article_view', {
                    articleId: articleId,
                    result: 'fail',
                });
                hideLoading();
            }
        });
    }
}

function insertComment() {
    if( !window.uid ) {
        alert('로그인 후 이용할 수 있습니다.');
        return;
    }
    const articleId = document.querySelector('#comment-save').dataset.articleId;
    const comment = document.querySelector('#comment-content').value;
    supa.from('comments').insert({article_id: articleId, contents: comment}).then(res => {
        document.querySelector('#comment-content').value = '';
        if( res.error ) {
            console.log(res.error);
            alert(res.error);
        }
    });
}
function deleteComment(obj) {
    supa.from('comments').delete().eq('id',obj.dataset.paramId).then(res => {
        if( res.error ) {
            console.log(res.error);
            alert(res.error);
        }
    });
}
function newComment(d) {
    const commentTemplate = document.querySelector('template#commentTemplate').innerHTML;
    const commentSection = document.querySelector('section#comments');
    const newComment = document.createElement('div');
    newComment.setAttribute('id', `comment-${d.id}`);
    newComment.innerHTML = commentTemplate
        .replace('{created_at}', `${tsToYmd(d.created_at)} ${tsToHms(d.created_at)}`)
        .replace('{contents}', DOMPurify.sanitize(marked.parse(d.contents)))
        .replace('{id}', d.id)
        .replace('{display}', `style="display: ${(window.uid=='dd83015d-bcd0-4b5f-95a8-74314c66490c' || window.uid==d.uid)?'inline-block':'none'};"`);
    commentSection.append(newComment);
}