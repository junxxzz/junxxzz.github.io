## FileDB를 사용하는 게시글 리스트

---

앞서 페이지를 md 파일을 읽어서 내용을 완성하도록 만들었는데, 이 페이지들을 연결하는 링크의 리스트를 만들어야 한다.
안그러면 페이지마다 또 각 페이지를 연결하는 html 작업을 해야 하니까.

이런 페이지 링크의 리스트를 자동으로 만드는 프로그램을 게시판이라고 부른다.

일반적으로 웹사이트의 게시판은 rdb를 이용하는 경우가 대부분이지만, 이번에는 기왕 md 파일을 불러와서 사용하는 김에 filedb를 이용한 게시판을 만들어보기로 했다.

일단 이 게시판의 리스트 소스는 이렇다.

```html
<section id="articles"></section>
<template id="articleTemplate">
    <span class="articleWriteAt">[{article-writeAt}]</span>
    <span class="articleIcons">{article-icons}</span>
    <span class="articleTitle">{article-title}</span>
</template>
```

html 에서는 리스트가 들어갈 공간을 section으로 선점해두고,
template 내부에 각 리스트의 내용이 될 구조를 넣어둔다.

```javascript
const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
const articleSection = document.querySelector('section#articles');
fetch('/articles.dat').then(res => {
    if( res.ok ) {
        res.text().then(d => {
        });
    }
});
```

javascript에서는 앞서 md 파일을 불러와서 페이지 내용을 채워넣었던 것처럼, 게시글 리스트를 담은 파일을 불러와준다.
게시글 리스트는 articles.dat 라는 파일에 넣기로 했다.
이 파일 내부에는 "|"를 구분자로 해서 "글번호, 작성일시, 카테고리, 제목" 을 연결해서 한개의 게시물을 표현한다.
게시물들의 구분은 당연히 엔터로 해준다.

만약 게시판을 rdb로 만들었다고 해도 이 구조는 비슷할 것이다.
아마도 list라는 테이블을 만들고, "글번호, 작성일시, 카테고리, 제목" 이라는 컬럼들을 만들었을거다.
물론 rdb로 만들었다면, 데이터 갱신이 유연하니 조회수라던가, 수정일시라던가 추가했을테고, 카테고리도 다른 테이블로 분리하고 했겠지만,
이 사이트에 그런건 필요없다.
하지만, 뷰 통계라던가 알고 싶으니까 나중에 google analyse는 추가할지도 모르겠다.

```javascript
const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
const articleSection = document.querySelector('section#articles');
fetch('/articles.dat').then(res => {
    if( res.ok ) {
        res.text().then(d => {
            d.split('\n').reverse().forEach(line => {
                if( !line.trim() ) {
                    return;
                }
                const [idx, writeAt, categorys, title] = line.split('|');
            });
        });
    }
});
```

filedb 구조를 정했으니 파일을 게시물 별로 쪼개보고 -> d.split('\n') 부분
게시물 별 데이터르 컬럼 별로 쪼개본다. -> line.split('|')

게시물 별 구분을 엔터로 하기로 했는데, 왜 '\n'로만 하는지 궁금할 수 있다.
알다시피 엔터는 윈도우에서는 '\r\n', 리눅스 계열에서는 '\n'를 사용하기 때문에 공통된 부분은 '\n'로만 분리하고
분리된 문자열은 trim()처리 함으로써 '\r'을 없애주는거다.

또, 각 게시물은 나중에 작성된 내용이 아래에 추가로 작성될 예정인데, 보여줄때는 나중에 작성된 게시물을 먼저 리스팅해주고 싶기 때문에 reverse()도 한번 해줬다.

```javascript
const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
const articleSection = document.querySelector('section#articles');
fetch('/articles.dat').then(res => {
    if( res.ok ) {
        res.text().then(d => {
            d.split('\r\n').reverse().forEach(line => {
                if( !line.trim() ) {
                    return;
                }
                const [idx, writeAt, categorys, title] = line.split('|');
                const newArticle = document.createElement('article');
                newArticle.setAttribute('id', `article-${idx}`);
                newArticle.innerHTML = articleTemplate.replace('{article-writeAt}',writeAt).replace('{article-title}',title);
                categorys.split(',').forEach(c => {
                    const newIcon = document.createElement('img');
                    newIcon.setAttribute('src',`/icons/${c.trim()}.svg`);
                    newIcon.classList.add('articleIcon');
                    newArticle.innerHTML = newArticle.innerHTML.replace('{article-icons}',newIcon.outerHTML);
                });
                articleSection.append(newArticle);
            });
        });
    }
});
```

이제 필요한 부분은 다 뽑아냈기 때문에 게시물을 보여주는 처리만 하면 된다.
articleSection 내부에 가져온 내용으로 새로 만든 article 오브젝트를 추가해준다.
카테고리는 혹시나, 여러개 카테고리를 지정할수 있을 것 같아서 "," 구분자로 넣는걸로 하고, 보기 좋게 아이콘으로 변경도 해줬다.

```javascript
const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
const articleSection = document.querySelector('section#articles');
fetch('/articles.dat').then(res => {
    if( res.ok ) {
        res.text().then(d => {
            d.split('\r\n').reverse().forEach(line => {
                if( !line.trim() ) {
                    return;
                }
                const [idx, writeAt, categorys, title] = line.split('|');
                const newArticle = document.createElement('article');
                newArticle.setAttribute('id', `article-${idx}`);
                newArticle.innerHTML = articleTemplate.replace('{article-writeAt}',writeAt).replace('{article-title}',title);
                categorys.split(',').forEach(c => {
                    const newIcon = document.createElement('img');
                    newIcon.setAttribute('src',`/icons/${c.trim()}.svg`);
                    newIcon.classList.add('articleIcon');
                    newArticle.innerHTML = newArticle.innerHTML.replace('{article-icons}',newIcon.outerHTML);
                });
                newArticle.addEventListener('click', () => {
                    setHash('articleId',idx);
                });
                articleSection.append(newArticle);
            });
        });
    }
});
```

마지막으로 게시물에 해당 페이지로 이동하는 링크를 넣어준다.

여기서는 setHash('articleId',idx); 부분이 해당 게시물의 링크인데, 앞서 나는 게시물을 md 파일을 불러와서 내용을 완성하는 형태로 했기 때문에 html 파일은 따로 없다.
그래서 게시물에 대한 파라미터를 받아서 해당하는 md 파일을 불러와야 한다.

파라미터는 일반적으로 form을 이용해서 post 파라미터로 받거나, 페이지 주소에 ?aaa=bb 형태로 붙여서 get 파라미터로 받을테지만,
git에 post를 처리할 backend를 만들수는 없기 때문에 post는 제외된다.

그러면 get 파라미터만 남지만, 사용할 수 있는 파라미터는 하나 더 있다.
hash 라고 하는 건데 웹 사이트를 이용하다보면 가끔 페이지에 #aaaa 라고 붙는 경우가 있다. 이게 hash 라는 거다.

get 파라미터는 쓰던, hash 데이터를 쓰던 별 상관은 없다.
그냥 난 hash를 쓰기로 한 것뿐.
