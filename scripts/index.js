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
    newcss.setAttribute('href',`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/stackoverflow-${scheme}.min.css`);
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
    const articleTemplate = document.querySelector("template#articleTemplate").innerHTML;
    const articleSection = document.querySelector("section#articles");
    let maArticleIdx = 0;
    fetch("/articles/list.dat").then((res) => {
        if (res.ok) {
            res.text().then((d) => {
                d.split("\n").reverse().forEach((line) => {
                    if (line.trim()) {
                        const [idx, writeAt, categorys, title] = line.split("|");
                        if (maArticleIdx == 0) {
                            maArticleIdx = idx;
                        }
                        const newArticle = document.createElement("article");
                        newArticle.setAttribute("id", `article-${idx}`);
                        newArticle.innerHTML = articleTemplate
                            .replace("{article-writeAt}", writeAt)
                            .replace("{article-title}", title);
                        let newIconHTML = '';
                        categorys.split(",").forEach((c) => {
                            const newIcon = document.createElement("img");
                            newIcon.setAttribute("src", `/icons/${c.trim()}.svg`);
                            newIcon.classList.add("articleIcon");
                            newIconHTML += newIcon.outerHTML;
                        });
                        newArticle.innerHTML = newArticle.innerHTML.replace("{article-icons}",newIconHTML);
                        newArticle.addEventListener("click", () => {
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