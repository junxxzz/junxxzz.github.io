## javascript를 이용해서 사용자 컬러모드에 맞는 css 로드하기

---

css에 media query 라는게 추가되면서 javascript에도 그에 대응되는 함수가 추가되었다.

window.matchMedia() 라는 함수이고,

window.matchMedia('(prefers-color-scheme: dark)') 이런식으로 인자값에 css에서 사용하던 미디어쿼리를 넣는다.

이 함수를 실행하면

MediaQueryList {media: '(prefers-color-scheme: dark)', matches: true, onchange: null}

이런 결과를 리턴해준다.

여기서 matches 라는 멤버변수를 이용해서 다크모드인지 알수 있게 된다.

어려운거 없으니 예제를 보고 이용해먹자.

```javascript
function loadColorScheme(scheme) {
    document.querySelector('link#highlightjs_css')?.remove();
    const newcss = document.createElement('link');
    newcss.setAttribute('id','highlightjs_css');
    newcss.setAttribute('rel','stylesheet');
    newcss.setAttribute('href',`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/stackoverflow-${scheme}.min.css`);
    document.querySelector('head').append(newcss);
}

loadColorScheme(window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark':'light');
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    loadColorScheme(event.matches? 'dark':'light');
});
```

이 사이트의 게시물은 모두 md를 이용해서 만드는데, 이때 소스 코드의 하이라이트 처리에 사용하는 테마가 컬러모드에 맞게 사용할 수 있게 돼있어서, 두가지 모두 활용하고 싶어서 만들어봤다.

matchMedia 함수에 관한 내용은 https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia 여기서 더 찾아볼 수 있다.