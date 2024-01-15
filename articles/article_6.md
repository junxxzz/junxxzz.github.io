[imgbb]: https://ko.imgbb.com/

## [imgbb]를 이용한 무료 이미지 서버 사용하기

---

아는 사람은 이미 다 알고 있겠지만, [imgbb]는 무료로 이미지 업로드, 다운로드, 뷰어를 이용할 수 있는 서비스를 제공해준다.

나같은 가난한 개발자는 이런 게시물을 만들 때에도 이미지는 잘 올리지 않는데, 아무래도 이미지 파일이 생각보다 용량을 많이 차지하기 때문에 트래픽이라던가 스토리지에 부과되는 금액이 부담스럽기 때문이다.

그럴 때, imgbb가 상당히 도움이 되는 때가 많다.

이 사이트는 무료 서비스만 이용해서 운영해 볼 예정이기 때문에, 이미지는 imgbb를 이용해보기로 했다.

그런김에, imgbb의 api를 이용해서 이미지를 업로드하는 방법을 공유한다.

아래는 해당 소스.

```html
<input type="file" name="userfile" id="userfile">
<input type="button" value="UPLOAD" onclick="getIMGBBURL()">
<p style="text-align: center;">업로드결과 : <span id="imgurl">-</span></p>
<p style="text-align: center;"><span id="img"></span></p>
```

```javascript
function getIMGBBURL() {
    const formdata = new FormData();
    const f = document.querySelector('#userfile').files[0];
    formdata.append('image', f, f.name);
    formdata.append('name', f.name);
    formdata.append('key', '--imgbb에서 발급받은 api key--');
    fetch(`https://api.imgbb.com/1/upload`, {
        method: 'POST',
        body: formdata,
    }).then(res => {
        res.json().then(d => {
            if( d.success ) {
                document.querySelector('#imgurl').innerHTML = d.data.url;
                document.querySelector('#img').innerHTML = `<img src="${d.data.url}" border="0" style="max-width: 100%;">`;
            }
            else {
                document.querySelector('#imgurl').innerHTML = d.error.message;
                document.querySelector('#img').innerHTML = '';
            }
        });
    });
}
```

별거 없다.

업로드 결과에 상세하게는 썸네일이라던가 뷰어 주소라던가 더 있지만, 난 쓸게 아니라서..

자세한 내용은 https://api.imgbb.com/ 여기를 참고하자.
