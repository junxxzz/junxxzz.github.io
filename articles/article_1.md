## md 파일을 읽어와서 페이지 완성하기

---

이 사이트는 기록용이자 정보공유용으로 할 예정이다.
하나의 글을 작성할때마다 한 페이지의 html 파일을 만드는 건 너무 귀챃고 지루한 일이다.
그래서 이 사이트의 게시글은 md 파일로 기록하고, 그 내용을 불러와서 페이지를 완성시켜 주려고 한다.

먼저 md 파일을 javascript로 읽은 후 페이지에 적당하게 보여줄 파서가 필요하다.
구글에서 "markdown javascript"로 검색하면 많은 라이브러리가 있는데, 그냥 사람들 많이 쓰는거 쓰기로 했다.

marked.j 라는 라이브러리를 사용하기로 했고, [Marked Git Repository](https://github.com/markedjs/marked/) 에서 구할 수 있다.
사용법도 해당 git repository에서 쉽게 찾을 수 있다.

```html
<div id="contents"></div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
document.getElementById('contents').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
</script>
```

대충 사용법대로 해보면 잘 동작하는걸 볼 수 있다.

이제 marked.parse() 내부에 들어갈 내용을 불러오는 스크립트를 만들어보자.

```javascript
fetch(`/articles/article_1.md`).then(res => {
    if( res.ok ) {
        res.text().then(d => {
            document.getElementById('contents').innerHTML = marked.parse(d);
        });
    }
});
```

md 파일은 articles 라는 폴더를 하나 만들어서 그 안에 넣기로 했다.
지금 작성하고 있는 이 파일이 article_1.md 파일이다.

전에는 jQuery의 ajax() 를 사용해서 파일 내용을 불어왔겠지만, 요즘은 javascript 내장 함수인 fetch() 함수를 사용한다.
개인적으로 ajax보다 fetch함수가 더 효율이 좋은 것 같다.

위 소스중에 fetch(), text() 함수 둘다 비동기 함수이기 때문에 .then()이나 await를 사용해야 한다는 것만 조심하면 된다.