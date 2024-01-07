## FileDB를 사용하는 게시글 리스트

---

일반적으로 웹사이트의 게시판은 rdb를 이용하는 경우가 대부분이지만, 이번에는 파일db를 이용한 게시판을 만들어보기로 했다.

일단 이 게시판의 리스트 소스는 이렇다.

```html
<section id="articles"></section>
<template id="articleTemplate">
    <span class="articleWriteAt">[{article-writeAt}]</span>
    <span class="articleIcons">{article-icons}</span>
    <span class="articleTitle">{article-title}</span>
</template>
```

```javascript
const articleTemplate = document.querySelector('template#articleTemplate').innerHTML;
const articleSection = document.querySelector('section#articles');
let maArticleIdx = 0;
fetch('/articles.dat').then(res => {
    if( res.ok ) {
        res.text().then(d => {
            d.split('\r\n').reverse().forEach(line => {
                if( !line.trim() ) {
                    return;
                }
                const [idx, writeAt, categorys, title] = line.split('|');
                if( maArticleIdx==0 ) {
                    maArticleIdx = idx;
                }
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
