setLoadComplete(function() {
    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=ko
    document.querySelector('#google').addEventListener('click', function() {
        let oauthClient = new jso.JSO({
            providerID: "google",
            authorization: "https://accounts.google.com/o/oauth2/auth",
            client_id: "920653369919-738ci7p79n38kvc9lv25ndfdvijm1kao.apps.googleusercontent.com",
            redirect_uri: "http://localhost:5500/logincheck.html", // The URL where you is redirected back, and where you perform run the callback() function.
            // redirect_uri: "https://junxxzz.github.io/logincheck.html", // The URL where you is redirected back, and where you perform run the callback() function.
            scopes: { request: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"] },
            state: 'google',
        });
        oauthClient.getToken().then((token) => {
            alert("I got the token: ", token)
        })
    });
    // // https://developers.kakao.com/docs/latest/ko/javascript/getting-started
    // document.querySelector('#naver').addEventListener('click', function() {
    //     const clientId = 'IqGGKZABT7U00aXroWR2';
    //     const redirectURI = 'http://localhost:5500/logincheck.html';
    //     location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&state=naver`;
    // });
    // // https://developers.kakao.com/docs/latest/ko/javascript/getting-started
    // document.querySelector('#kakao').addEventListener('click', function() {
    //     Kakao.init('fe986932d0dbdd68fefd7de7dddcb0d1');
    //     console.log(Kakao.isInitialized());
    //     Kakao.Auth.authorize({
    //         redirectUri: 'http://localhost:5500/logincheck.html',
    //         state: 'kakao',
    //     });
    // });
    // // https://docs.github.com/en/enterprise-cloud@latest/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
    // document.querySelector('#github').addEventListener('click', function() {
    //     let oauthClient = new jso.JSO({
    //         providerID: "github",
    //         authorization: "https://github.com/login/oauth/authorize",
    //         client_id: "1feec8b27f62e46c8dd8",
    //         scopes: { request: ["user"] },
    //         state: 'github',
    //     });
    //     oauthClient.getToken().then((token) => {
    //         alert("I got the token: ", token)
    //     })
    // });
});