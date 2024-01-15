## OAuth를 이용한 소셜로그인

---

본디 웹사이트라면 응당 로그인이 있어야 하는법.

사이트에 로그인을 붙여보았다. 근데 소셜로그인을 이용한.

소셜로그인은 OAuth라는 프로토콜을 이용해서 적용하게 되는데, 결국은 토큰 방식의 로그인을 말한다.

로그인을 제공하는 소셜미디어마다 자기들만의 api를 제공하고 있는데, 이건 구글에서 "google oauth" 라던가 "instagram oauth" 라던가 로 검색하면 나온다.

OAuth 를 적용하는 순서는 이렇다.

1. 사용자의 로그인을 유도하는 링크를 호출한다.

2. 사용자는 해당 로그인 페이지에서 로그인을 한다. (이 로그인 페이지는 해당 소셜미디어에서 제공하는 것이니 신경쓸 필요 없다.)

3. 로그인이 완료된 후에는 1.에서 호출할 때 사용한 파라미터 중 redirect_uri 라는 것에 넣어준 주소로 이동된다.
이동된 페이지가 내가 로그인 처리를 해야 하는 페이지다.
로그인이 완료되면 access_token 이라는 일회성 토큰을 알려주는데, 이게 있으면 사용자 정보 중 원하는 내용을 알아올 수 있다.
사용자 정보를 알아왔으면 쿠키로 로그인된 상태를 굽거나, web storage를 이용하거나 하는데 나는 web storage 중 session storage 를 이용했다.
로그인 처리 후에 내 사이트의 index 페이지로 다시 이동시켜주면 된다.

4. 로그인 버튼은 없애주고 로그아웃 버튼을 달아주면 된다.

따로 내가 로그인 ui를 만들 필요도 없고, 내 사이트에 가입하라고 할 필요도 없으니 너무 간단해서 좋다.

다만, access_token 을 얻어오는 과정이 소셜미디어 별로 조금씩 다른데, google 이나 facebook 같은 경우에는 로그인 하고 나면 바로 access_token 을 주는 반면에

naver, kakao, github 등은 내가 등록한 secret code 를 포함해서 한번 더 요청을 해야 access_token 을 준다.

그런데 이 요청에서 secret code 는 사용자에게 노출이 되면 안되는 값이라서 front만 사용하는 이 사이트에서는 쓸 수가 없다.

backend에서 curl을 사용한 요청으로만 가져올 수 있다.

그래서 결국 google 로그인만 사용하기로 했다. 뭐 다들 google 아이디는 있겠지.

그리고, 참고로.

소셜미디어마다 각자 OAuth 를 위한 javascript sdk를 제공하고 있는데, 이건 굳이 쓸 필요 없다.

개발자들 편하게 해주려고 만들어놓은 것 같긴 한데, 그냥 location 이랑 fetch 만 사용해도 OAuth 는 충분히 구현할 수 있다.

아래는 google 로그인을 위한 소스니 참고.

**로그인 요청하는 스크립트**

```javascript
document.querySelector('#userlogin').addEventListener('click', function() {
    const oauth2Endpoint  = 'https://accounts.google.com/o/oauth2/auth';
    const client_id = '--여기에 구글 oauth 사용 등록한 아이디--';
    const redirect_uri = '--여기에 로그인 후 redirection될 웹 주소--';
    // 이건 사용자에게 요구할 정보의 범위를 지정, 내 사이트에는 사용자 이름이랑 이메일만 알면되는거라 이거면 충분
    const scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    // 이건 보통 랜덤키 돌려서 검증용으로 쓰는데, 굳이 검증할 필요없으면 아무거나 고정해도 무방
    const state = 'google';
    location.href = oauth2Endpoint+`?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;
});
```

**사용자가 login 완료 후 redirection된 페이지에서 내 사이트에 로그인 처리하는 스크립트**

```javascript
// infos.access_token : 넘어온 토큰 값
// http://localhost:5500/logincheck.html#state=90caad4b-a2b2-4301-8d4d-eef5ba9c8601&access_token=ya29.a0AfB_byBu25IMDAdKPYYmr8EEqIfPB4BhwG7FTLFQmAgcrLztnlhdGZrgrV1jsJNiIIh1bk3ifSayjvRhSRltxAq96DjCJ_ywl-9ddCe88zrMgiAlmA30C2AsxeY8gerqnL19OxnHpVTnQrYpaCsxL8-gqMPFwnSnTAaCgYKAX4SARISFQHGX2MiJlg8aOF9VAvePx_ec5uH-g0169&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmNDBmMGE4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTIwNjUzMzY5OTE5LTczOGNpN3A3OW4zOGt2YzlsdjI1bmRmZHZpam0xa2FvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTIwNjUzMzY5OTE5LTczOGNpN3A3OW4zOGt2YzlsdjI1bmRmZHZpam0xa2FvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyNzMxMzEwMjcwMzU3NzAxMTM4IiwiZW1haWwiOiJqdW54eHp6QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiazYwV2ZNRFN1bDd0d2VRRW0tSXB5ZyIsIm5iZiI6MTcwNTI0MDIxMywiaWF0IjoxNzA1MjQwNTEzLCJleHAiOjE3MDUyNDQxMTMsImp0aSI6IjU1MzBhMWQ3MGZlMzM2NDVmYzQxZGY3MTdhMWU3NGNjZTZmOGU5ZjcifQ.HKcliW3FKOjW4bh5R4bYTv7PjyTN0gZOQ7OYlL0aalQJKkyDeyWi8QI2Qyb6iatvrC-ZxTe7VMcmqbCUCMgpGDZHZNRvOUnhG9ic8O3l6LoGzFp8DO318kvUnPEwYx1KeTQDEs4J7gpDL10zL9LPM6MSxvOAojKtpDZC-RLByKxIyjIQne9WizS7vAY1aIp3dAhpV23Ze2b_vkPnDXVZ58M_RwMEyDsCKgwOSOYnTQJY_j2O6vQ-YZKkelZN94ujk6dFj2RIHsCmR3d0vU_b6VDBp4UEUBsyoDpUsHOc-zacjiaW5YuLu5wfziPcZJyp7bQ8iAipTv38wkNobyb1hg&authuser=0&prompt=consent&version_info=CmxfU1ZJX0VOYklzX2lEM1lNREdBNGlQMDFCUlVSSVpsOXhiRzlUWjFJMWVsaHNWMHBEVUhGalJYSmZRMWRJTFRSVWRXa3pOblZpYTNwVmFUTmlSR2hmV20wNU1XSnlXbE41TFc5UVdFRjZRUV8 이런식으로 넘어오는데, 해쉬값 구분처리한 것 뿐이다.
fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${infos.access_token}`).then(res => {
    res.json().then(d => {
        sessionStorage.setItem('access_token', infos.access_token);
        sessionStorage.setItem('provider', 'google');
        for (const k in d) {
            if (Object.hasOwnProperty.call(d, k)) {
                sessionStorage.setItem(k, d[k]);
            }
        }
        location.href = '/';
    });
});
```

**로그아웃시키는 스크립트**

```javascript
let revokeTokenEndpoint = `https://oauth2.googleapis.com/revoke?token=${sessionStorage.getItem('access_token')}`;
fetch(revokeTokenEndpoint, {
    method: 'POST',
}).then(res => {
    if( res.ok ) {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
});
```

너무 쉽고 편하다. 회사에서도 그냥 이런거 쓰면 좋겠다.

근데, 로그인은 만들었는데, 딱히 유저 정보를 쓸데는 아직 없다...