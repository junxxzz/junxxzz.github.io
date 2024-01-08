const {markedHighlight} = globalThis.markedHighlight;
marked.use(markedDirective.createDirectives());
// marked.use(markedLinkifyIt({},{}));
marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        const addon = `<div class='language'>${language}</div>`;
        return hljs.highlight(code, { language }).value + addon;
    }
}));
marked.use({ breaks: true, });

setLoadComplete(function() {
    listenHash(loadArticle);
    const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
    const articleSection = document.querySelector('section#articles');
    let maArticleIdx = 0;
    fetch('/articles.dat').then(res => {
        if( res.ok ) {
            res.text().then(d => {
                d.split('\n').reverse().forEach(line => {
                    if( !line.trim() ) {
                        return;
                    }
                    const [idx, writeAt, categorys, title] = line.split('|');
                    if( maArticleIdx==0 ) {
                        maArticleIdx = idx;
                    }
                    const newArticle = document.createElement('article');
                    newArticle.setAttribute('id', `article-${idx}`);
                    newArticle.innerHTML = articleTemplate.replace('{article-writeAt}',writeAt).replace('{article-title}',title);
                    categorys.split(',').forEach(c => {
                        const newIcon = document.createElement('img');
                        newIcon.setAttribute('src',`/icons/${c.trim()}.svg`);
                        newIcon.classList.add('articleIcon');
                        newArticle.innerHTML = newArticle.innerHTML.replace('{article-icons}',newIcon.outerHTML);
                    });
                    newArticle.addEventListener('click', () => {
                        setHash('articleId',idx);
                    });
                    articleSection.append(newArticle);
                });

                if( !window.hash.articleId ) {
                    window.hash.articleId = maArticleIdx;
                    loadArticle(window.hash);
                }
            });
        }
    });
});

function loadArticle(hash) {
    if( hash.articleId > 0 ) {
        fetch(`/articles/article_${hash.articleId}.md`).then(res => {
            if( res.ok ) {
                res.text().then(d => {
                    document.getElementById('contents').innerHTML = DOMPurify.sanitize(marked.parse(d));
                });
            }
        });
    }
}