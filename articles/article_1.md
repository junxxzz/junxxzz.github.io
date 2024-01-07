## md 파일을 읽어와서

---

이 사이ㅡㅡ 기록용이ㅏ ㅓㅇ보공유용으로 할 예ㅓㅇ이다.
하ㅏ의 글을 ㅏㄱ성할때마다 하페이ㅣ의 html 파일을 마드ㅡ거 ㅓ무 귀챃고 ㅣ루하 일이다.
그래서 이 사이ㅡ의 게시글으 md 파일로 기록하고, 그 ㅐ용을 불러와서 페이ㅣ를 와성시켜ㅜ려고 하다.

머ㅓ md 파일을 javacript로 ㅏㅍ싱후 페이ㅣ에 괘챃게 보여ㅜㅡ 파서가 필요하다.
구글에서 markdown javascript 로 검색하며 맣으 라이브러리가 이쓰데, 그ㅑㅇ 사람들 맣이 쓰ㅡ거 쓰기로 했다.

marked.j 라ㅡ 라이브러리를 사용하기로 했고, https://github.com/markedjs/marked/ 에서 구할 수 있다.
사용법도 해당 git repoitory에서 쉽게 차을수 있다.

```html
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
document.getElementById('content').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
</script>
```

ㅓ무 쉽다.
