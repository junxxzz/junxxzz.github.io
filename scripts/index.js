
setLoadComplete(function () {
    const email = sessionStorage.getItem('email');
    if( email ) {
        document.querySelector('#userlogin').style.display = 'none';
        document.querySelector('#userlogout').style.display = 'block';
    }
    document.querySelector('#userlogin').addEventListener('click', function() {
        const oauth2Endpoint  = 'https://accounts.google.com/o/oauth2/auth';
        const client_id = '920653369919-738ci7p79n38kvc9lv25ndfdvijm1kao.apps.googleusercontent.com';
        const redirect_uri = 'https://junxxzz.github.io/logincheck.html'; // The URL where you is redirected back, and where you perform run the callback() function.
        const scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        const state = 'google';
        location.href = oauth2Endpoint+`?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
    });
    // document.querySelector('#userlogin-facebook')?.addEventListener('click', function() {
    //     const oauth2Endpoint  = 'https://www.facebook.com/v18.0/dialog/oauth';
    //     const client_id = '311715835202754';
    //     const redirect_uri = 'http://localhost:5500/logincheck.html'; // The URL where you is redirected back, and where you perform run the callback() function.
    //     const scopes = 'public_profile,email';
    //     const state = 'facebook';
    //     location.href = oauth2Endpoint+`?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
    // });
    document.querySelector('#userlogout').addEventListener('click', function() {
        let revokeTokenEndpoint;
        if( sessionStorage.getItem('provider')=='google' ) {
            revokeTokenEndpoint = `https://oauth2.googleapis.com/revoke?token=${sessionStorage.getItem('access_token')}`;
        }
        // else if( sessionStorage.getItem('provider')=='facebook' ) {
        //     revokeTokenEndpoint = `https://graph.facebook.com/v18.0/me/permissions?access_token=${sessionStorage.getItem('access_token')}&format=json&method=delete`;
        // }
        fetch(revokeTokenEndpoint, {
            method: 'POST',
        }).then(res => {
            if( res.ok ) {
                localStorage.clear();
                sessionStorage.clear();
                location.reload();
            }
        });
    });

    loadArticleList();
    listenHash(loadArticle);
});
