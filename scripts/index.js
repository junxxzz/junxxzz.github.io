
setLoadComplete(function () {
    const email = sessionStorage.getItem('email');
    if( email ) {
        console.log('logedin'+email);
    }
    document.querySelector('#userlogin').addEventListener('click', function() {
        location.href = '/login.html';
    });
    document.querySelector('#userlogout').addEventListener('click', function() {
        oauthClient.wipeTokens();
    });

    loadArticleList();
    listenHash(loadArticle);
});
