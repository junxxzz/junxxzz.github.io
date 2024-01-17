
setLoadComplete(function () {
    const email = sessionStorage.getItem('email');
    if( email ) {
        document.querySelector('#userlogin').style.display = 'none';
        document.querySelector('#userlogout').style.display = 'inline-block';
        const name = sessionStorage.getItem('given_name');
        if( name ) {
            document.querySelector('#username').innerHTML = `Hi, ${name}!!`;
        }
    }
    else {
        localStorage.clear();
        sessionStorage.clear();
    }

    document.querySelector('header section#userinfo svg').addEventListener('click', function() {
        this.classList.toggle('on');
        document.querySelector('aside').classList.toggle('on');
    });
    document.querySelector('#userlogin').addEventListener('click', function() {
        const oauth2Endpoint  = 'https://accounts.google.com/o/oauth2/auth';
        const client_id = '920653369919-738ci7p79n38kvc9lv25ndfdvijm1kao.apps.googleusercontent.com';
        const redirect_uri = `${document.location.origin}/logincheck.html`; // The URL where you is redirected back, and where you perform run the callback() function.
        const scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        const state = 'google';
        location.href = oauth2Endpoint+`?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
    });
    document.querySelector('#userlogout').addEventListener('click', function() {
        let revokeTokenEndpoint;
        if( sessionStorage.getItem('provider')=='google' ) {
            revokeTokenEndpoint = `https://oauth2.googleapis.com/revoke?token=${sessionStorage.getItem('access_token')}`;
        }
        fetch(revokeTokenEndpoint, {
            method: 'POST',
        }).then(res => {
            localStorage.clear();
            sessionStorage.clear();
            supa.auth.signOut().then(() => {
                location.reload();
            });
        });
    });
});

function go_image_upload() {
    location.href = '/imgbb.html';
}
function go_article_list() {
    location.href = '/#articles';
}