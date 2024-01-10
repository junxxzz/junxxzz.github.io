setLoadComplete(function() {
    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=ko
    document.querySelector('#google').addEventListener('click', function() {
        let oauthClient = new jso.JSO({
            providerID: "google",
            authorization: "https://accounts.google.com/o/oauth2/auth",
            client_id: "920653369919-738ci7p79n38kvc9lv25ndfdvijm1kao.apps.googleusercontent.com",
            redirect_uri: "https://junxxzz.github.io/logincheck.html", // The URL where you is redirected back, and where you perform run the callback() function.
            scopes: { request: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"] }
        });
        oauthClient.getToken().then((token) => {
            alert("I got the token: ", token)
        })
    });
    // https://docs.github.com/en/enterprise-cloud@latest/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app
    document.querySelector('#github').addEventListener('click', function() {
        let oauthClient = new jso.JSO({
            providerID: "github",
            authorization: "https://github.com/login/oauth/authorize",
            client_id: "1feec8b27f62e46c8dd8",
            scopes: { request: ["user"] }
        });
        oauthClient.getToken().then((token) => {
            alert("I got the token: ", token)
        })
    });
});