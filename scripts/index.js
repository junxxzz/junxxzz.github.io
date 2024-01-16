const { createClient } = supabase;
const supaurl = "https://plsiicrtbryicuagbfly.supabase.co";
const supakey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2lpY3J0YnJ5aWN1YWdiZmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MjU0MzYsImV4cCI6MjAxNjUwMTQzNn0.QdztP5iLKcRzhQ7KESr9TXyjFjlF07k56TXJgPs0BjQ";
const supa = createClient(supaurl, supakey);

setLoadComplete(function () {
    loadArticleList();
    listenHash(loadArticle);
    listenColorScheme(loadColorScheme);
});
function loadColorScheme(scheme) {
    document.querySelector('link#highlightjs_css')?.remove();
    const newcss = document.createElement('link');
    newcss.setAttribute('id','highlightjs_css');
    newcss.setAttribute('rel','stylesheet');
    newcss.setAttribute('href',`/scripts/stackoverflow-${scheme}.min.css`);
    document.querySelector('head').append(newcss);
}

const {markedHighlight} = globalThis.markedHighlight;
marked.use(markedDirective.createDirectives());
marked.use(markedLinkifyIt({},{}));
marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            const addon = `<div class='language'>${language}</div>`;
            return hljs.highlight(code, {
                language
            }).value + addon;
        },
    }),
);
marked.use({breaks: true});

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
                        newArticle.innerHTML = articleTemplate
                            .replace('{article-writeAt}', writeAt)
                            .replace('{article-title}', title);
                        let newIconHTML = '';
                        categorys.split(',').forEach((c) => {
                            const newIcon = document.createElement('img');
                            newIcon.setAttribute('src', `/icons/${c.trim()}.svg`);
                            newIcon.classList.add('articleIcon');
                            newIconHTML += newIcon.outerHTML;
                        });
                        newArticle.innerHTML = newArticle.innerHTML.replace('{article-icons}',newIconHTML);
                        newArticle.addEventListener('click', () => {
                            setHash("articleId", idx);
                        });
                        articleSection.append(newArticle);
                    }
                });
                listenHash(activeArticle);
                if (!window.hash.articleId) {
                    window.hash.articleId = maArticleIdx;
                    loadArticle(window.hash);
                    activeArticle(window.hash);
                }
            });
        }
    });
}
function activeArticle(hash) {
    if (hash.articleId > 0) {
        document.querySelectorAll(`section#articles > article`).forEach(a => a.classList.remove('on'));
        document.querySelector(`section#articles > article#article-${hash.articleId}`).classList.add('on');
    }
}
function loadArticle(hash) {
    if (hash.articleId > 0) {
        showLoading();
        fetch(`/articles/article_${hash.articleId}.md`).then((res) => {
            if (res.ok) {
                const commentTemplate = document.querySelector('template#commentTemplate').innerHTML;
                const commentSection = document.querySelector('section#comments');

                activeArticle(hash.articleId);
                res.text().then((d) => {
                    // document.getElementById("contents").innerHTML = DOMPurify.sanitize(
                    //     marked.parse(d),
                    // );
                    document.getElementById("contents").innerHTML = marked.parse(d);
                    let matches;
                    if( matches=document.getElementById("contents").innerHTML.match(/\<script src=([^\>]+)\>\s*\<\/script\>/gmi) ) {
                        matches.forEach(m => {
                            let s = m.split('src=');
                            s = s[1].split('>');
                            const u = s[0].match(/[\/a-z0-9\._]+/);
                            const newjs = document.createElement('script');
                            newjs.setAttribute('src', u[0]);
                            document.body.append(newjs);
                        });
                    }
                    supa.auth.getUser().then(res => {
                        var uid;
                        if( !res.error ) {
                            uid = res.data.user.id;
                        }
                        supa.from('comments').select().eq('article_id',hash.articleId).then(res => {
                            if( !res.error ) {
                                res.data.forEach(d => {
                                    const trash = uid==d.uid?'<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"/></svg>':'';
                                    const newComment = document.createElement('div');
                                    newComment.setAttribute('id', `comment-${d.id}`);
                                    newComment.innerHTML = commentTemplate
                                        .replace('{created_at}', `${tsToYmd(d.created_at)} ${tsToHms(d.created_at)}`)
                                        .replace('{contents}', DOMPurify.sanitize(marked.parse(d.contents)))
                                        .replace('{trash}', trash);
                                    newComment.querySelector('.comment-trash').querySelector('svg').addEventListener('click', () => {
                                        console.log(d.id);
                                    });
                                    commentSection.append(newComment);
                                });
                            }
                        });
                    });
                    window.scrollTo(0, 0);
                    gtag("event", "article_view", {
                        articleId: hash.articleId,
                        result: "success",
                    });
                    hideLoading();
                });
            } else {
                gtag("event", "article_view", {
                    articleId: hash.articleId,
                    result: "fail",
                });
                hideLoading();
            }
        });
    }
}