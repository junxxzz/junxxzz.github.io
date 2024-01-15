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