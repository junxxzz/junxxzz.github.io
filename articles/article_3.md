## Sliding Counter

---

쓸데가 있을지 모르겠지만, 그냥 만들어봤다.

<div id="counter">0</div>
<input type="button" value="up" onclick="counterUp_once(document.querySelector('#counter'))">
<input type="button" value="down" onclick="counterDown_once(document.querySelector('#counter'))">
<input type="button" value="up_linear" onclick="counterUp_linear(document.querySelector('#counter'))">
<input type="button" value="down_linear" onclick="counterDown_linear(document.querySelector('#counter'))">

<div id="counter2">994</div>
<input type="button" value="up" onclick="counterUp_once(document.querySelector('#counter2'))">
<input type="button" value="down" onclick="counterDown_once(document.querySelector('#counter2'))">
<input type="button" value="up_linear" onclick="counterUp_linear(document.querySelector('#counter2'))">
<input type="button" value="down_linear" onclick="counterDown_linear(document.querySelector('#counter2'))">

<div id="counter1">12345</div>
<input type="button" value="up" onclick="counterUp_once(document.querySelector('#counter1'))">
<input type="button" value="down" onclick="counterDown_once(document.querySelector('#counter1'))">
<input type="button" value="up_linear" onclick="counterUp_linear(document.querySelector('#counter1'))">
<input type="button" value="down_linear" onclick="counterDown_linear(document.querySelector('#counter1'))">

<script src="/articles/counter.js"></script>
<script src="/articles/counter_exec.js"></script>

근데 0이 아닌 숫자로 시작했을 경우에 그 숫자보다 아래로 내려가는 경우의 애니메이션 처리를 어케 해야 할지 도통 생각이 안난다.

암튼, 소스는 이렇다.

최초에 한번 실행해줘야 하는 초기화 함수.

```javascript
function counter(obj, start, fsize) {
    if( !fsize ) {
        fsize = 20;
    }
    if( !start ) {
        start = 0
    }
    obj.innerHTML = '';
    const counterdiv = document.createElement('div');
    counterdiv.classList.add('counterdiv');
    counterdiv.dataset.nownum = start;
    counterdiv.textContent = '';
    counterdiv.style.display = 'flex';
    counterdiv.style.height = fsize+'px';
    counterdiv.style.maxHeight = fsize+'px';
    counterdiv.style.overflow = 'hidden';
    counterdiv.style.fontSize = fsize+'px';
    counterdiv.style.lineHeight = fsize+'px';
    obj.append(counterdiv);
    String(start).split('').reverse().forEach((s,i) => {
        if( i!=0 && i%3==0 ) {
            const commadiv = document.createElement('div');
            commadiv.classList.add('commadiv');
            const newcomma = document.createElement('div');
            newcomma.textContent = ',';
            commadiv.append(newcomma);
            counterdiv.prepend(commadiv);
        }
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = s;
        numdiv.dataset.y = 1;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = s;
        numdiv.append(newnum);
        counterdiv.prepend(numdiv);
        numdiv.style.transition = 'ease 1s';
    });
}
```

```javascript
// 이렇게 실행해준다.
counter(document.querySelector('#counter'),document.querySelector('#counter').innerHTML,50);
```

카운터 값 증가 함수.

```javascript
function counterUp(obj) {
    const counterdiv = obj.querySelector('div.counterdiv');
    counterdiv.dataset.nownum = Number(counterdiv.dataset.nownum) + 1;
    const numdivs = obj.querySelectorAll('div.numdiv');
    let nomore = false;
    let fsize = 0;
    for( let i=(numdivs.length-1); i>=0; i-- ) {
        const numdiv = numdivs[i];
        numdiv.dataset.num = Number(numdiv.dataset.num) + 1;
        if( numdiv.dataset.num==10 ) {
            numdiv.dataset.num = '0';
        }
        const newnum = document.createElement('div');
        newnum.textContent = numdiv.dataset.num;
        numdiv.querySelector('div:nth-of-type('+numdiv.dataset.y+')').after(newnum);
        numdiv.style.transform = 'translateY('+String(-1 * Number(numdiv.dataset.y) * Number(numdiv.dataset.fsize))+'px)';
        numdiv.dataset.y = Number(numdiv.dataset.y) + 1;
        if( numdiv.dataset.num!='0' ) {
            break;
        }
        else if( i==0 ) {
            nomore = true;
            fsize = numdiv.dataset.fsize;
        }
    }
    if( nomore ) {
        const counterdiv = obj.querySelector('.counterdiv');
        if( numdivs.length % 3 == 0 ) {
            const commadiv = document.createElement('div');
            commadiv.classList.add('commadiv');
            const newcomma = document.createElement('div');
            newcomma.textContent = ',';
            commadiv.append(newcomma);
            counterdiv.prepend(commadiv);
        }
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = '1';
        numdiv.dataset.y = 1;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = '1';
        numdiv.append(newnum);
        counterdiv.prepend(numdiv);
        numdiv.style.transition = 'ease 1s';
    }
}
```

```javascript
// 이렇게 실행해준다.
counterUp(document.querySelector('#counter'));
```

카운터 값 감소 함수

```javascript
function counterDown(obj) {
    const counterdiv = obj.querySelector('div.counterdiv');
    if( counterdiv.dataset.nownum=='0' ) {
        return;
    }
    counterdiv.dataset.nownum = Number(counterdiv.dataset.nownum) - 1;
    const numdivs = obj.querySelectorAll('div.numdiv');
    let nomore = false;
    let fsize = 0;
    for( let i=(numdivs.length-1); i>=0; i-- ) {
        const numdiv = numdivs[i];
        numdiv.dataset.num = Number(numdiv.dataset.num) - 1;
        if( numdiv.dataset.num < 0 ) {
            numdiv.dataset.num = '9';
        }
        if( numdiv.dataset.y==1 ) {
            const newnum = document.createElement('div');
            newnum.textContent = numdiv.dataset.num;
            numdiv.querySelector('div:nth-of-type('+numdiv.dataset.y+')').before(newnum);
        }
        else {
            numdiv.dataset.y = Number(numdiv.dataset.y) - 1;
            if( numdiv.dataset.y <= 0 ) {
                numdiv.dataset.y = '1';
            }
        }
        numdiv.style.transform = 'translateY('+String(-1 * (Number(numdiv.dataset.y)-1) * Number(numdiv.dataset.fsize))+'px)';
        if( numdiv.dataset.num!='9' ) {
            break;
        }
    }
}
```

```javascript
// 이렇게 실행해준다.
counterDown(document.querySelector('#counter'));
```
