## Sliding Counter 2

---

일전에 만들었던 슬라이딩 카운터가 영 맘에 안들어서 제대로 다시 만들었다.

이번에는 객체화도 했고, 프로토타입을 이용한 객첵 확장을 사용했다.

이전 버전의 잔재가 남아있어서 dataset을 그대로 사용하는 부분도 있는데, 딱히 거슬리는 부분은 아니어서 그냥 두기로 했다.

<div id="counter"></div>
<input type="button" value="plus" onclick="window.clearInterval(window.aa); c.plus()">
<input type="button" value="minus" onclick="window.clearInterval(window.aa); c.minus()">
<input type="button" value="plus linear" onclick="window.clearInterval(window.aa); window.aa = window.setInterval(() => {c.plus()},500)">
<input type="button" value="minus linear" onclick="window.clearInterval(window.aa); window.aa = window.setInterval(() => {c.minus()},500)">

<div id="counter1"></div>
<input type="button" value="plus" onclick="window.clearInterval(window.bb); c1.plus()">
<input type="button" value="minus" onclick="window.clearInterval(window.bb); c1.minus()">
<input type="button" value="plus linear" onclick="window.clearInterval(window.bb); window.bb = window.setInterval(() => {c1.plus()},500)">
<input type="button" value="minus linear" onclick="window.clearInterval(window.bb); window.bb = window.setInterval(() => {c1.minus()},500)">

<script src="/scripts/counter2.js"></script>
<script src="/scripts/counter2_exec.js"></script>

아래는 소스

```javascript
function counter(obj, start, fsize) {
    if( !fsize ) {
        fsize = 50;
    }
    if( !start ) {
        start = 0;
    }
    obj.innerHTML = '';
    const counterdiv = document.createElement('div');
    counterdiv.classList.add('counterdiv');
    counterdiv.dataset.nownum = start;
    counterdiv.style.display = 'flex';
    counterdiv.style.overflow = 'hidden';
    counterdiv.style.height = fsize+'px';
    counterdiv.style.maxHeight = fsize+'px';
    counterdiv.style.fontSize = fsize+'px';
    counterdiv.style.lineHeight = fsize+'px';
    obj.append(counterdiv);

    counterdiv.__proto__.numdivs = [];
    counterdiv.__proto__.lastaction = '';
    counterdiv.__proto__.timer = null;
    counterdiv.__proto__.init = function() {
        this.numdivs = [];
        this.innerHTML = '';
        String(this.dataset.nownum).split('').reverse().forEach(s => this.addnum(s));
    }
    counterdiv.__proto__.addcomma = function() {
        const commadiv = document.createElement('div');
        commadiv.classList.add('commadiv');
        const newcomma = document.createElement('div');
        newcomma.textContent = ',';
        commadiv.append(newcomma);
        this.prepend(commadiv);
    }
    counterdiv.__proto__.addnum = function(arg) {
        const numleng = this.querySelectorAll('.numdiv').length
        if( numleng!=0 && numleng%3==0 ) {
            this.addcomma();
        }
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = arg;
        numdiv.dataset.y = -1;
        numdiv.dataset.fsize = fsize;
        numdiv.style.transition = 'ease 1s';
        numdiv.style.transform = 'translateY(0)';
        numdiv.__proto__.newnum = function(arg,p) {
            const newnum = document.createElement('div');
            newnum.textContent = arg;
            if( p ) {
                newnum.style.position = 'absolute';
                newnum.style.top = `${Number(this.dataset.y) * Number(this.dataset.fsize)}px`;
                this.prepend(newnum);
            }
            else {
                this.append(newnum);
            }
            this.style.transform = `translateY(${-1 * this.dataset.y * this.dataset.fsize}px)`;
        }
        numdiv.__proto__.appenditem = function(arg) {
            this.dataset.num = arg;
            this.dataset.y = Number(this.dataset.y) + 1;
            this.newnum(arg);
        }
        numdiv.__proto__.prependitem = function(arg) {
            this.dataset.num = arg;
            this.dataset.y = Number(this.dataset.y) - 1;
            this.newnum(arg,'absolute');
        }
        numdiv.appenditem((arg>=10)? 0:arg);
        this.numdivs.push(numdiv);
        this.prepend(numdiv);
    }
    counterdiv.__proto__.action = function(action) {
        window.clearTimeout(this.timer);
        if( this.lastaction!='' && action!=this.lastaction ) {
            this.init();
        }
        this.lastaction = action;
        const nownum = Number(this.dataset.nownum) + (action=='plus'? 1:-1);
        if( nownum < 0 ) {
            return;
        }
        this.dataset.nownum = nownum;
        String(nownum).split('').reverse().forEach((s,i) => {
            window.setTimeout(() => {
                const numdiv = this.numdivs[i];
                if( !numdiv ) {
                    this.addnum(s);
                }
                else {
                    if( s!=numdiv.dataset.num ) {
                        if( action=='plus' ) {
                            numdiv.appenditem(s);
                        }
                        else if( action=='minus' ) {
                            numdiv.prependitem(s);
                        }
                    }
                }
            },1);
        });
        this.timer = window.setTimeout(() => {this.init()}, 10500);
    }
    counterdiv.__proto__.plus = function() {
        this.action('plus');
    }
    counterdiv.__proto__.minus = function() {
        this.action('minus');
    }
    counterdiv.init();
    return counterdiv;
}
```

실행은 이렇게

```javascript
const c = counter(document.querySelector('#counter'), 0);   // 초기화
const c1 = counter(document.querySelector('#counter1'), 12345, 100); // fsize를 100으로 초기화
c.plus();   // 값 증가
c.minus();  // 값 감소
```

언젠가 쓸 일이 있으면 좋겠다.
