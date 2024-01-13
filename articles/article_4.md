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

아래는 전체 소스

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
    counterdiv.dataset.fsize = fsize;
    counterdiv.style.display = 'flex';
    counterdiv.style.overflow = 'hidden';
    counterdiv.style.height = fsize+'px';
    counterdiv.style.maxHeight = fsize+'px';
    counterdiv.style.fontSize = fsize+'px';
    counterdiv.style.lineHeight = fsize+'px';
    obj.append(counterdiv);

    counterdiv.__proto__.numdivs = [];
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
        numdiv.dataset.fsize = this.dataset.fsize;
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
    counterdiv.__proto__.removenum = function() {
        this.querySelector('.numdiv:first-of-type').remove();
        this.numdivs.pop();
        if( this.querySelector('div:first-of-type').classList.contains('commadiv') ) {
            this.querySelector('div:first-of-type').remove();
        }
    }
    counterdiv.__proto__.lastaction = '';
    counterdiv.__proto__.timer = null;
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
        if( this.numdivs.length > String(nownum).length ) {
            this.removenum();
        }
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
        this.timer = window.setTimeout(() => {this.init()}, 2000);
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

이 카운터 프로그램에서 중요한 것만 얘기해보자면,

**counterdiv.init 함수가 제일 중요하겠다. 내용이야 뻔하지만, 실행되는 위치가 중요하다.**

최초에 객체 초기화시에도 실행되지만, 중간에 타이머를이용해서도 초기화하고, plus에서 minus로 넘어갈때나 반대의 경우에도 초기화해준다.

이 카운터 ui가 dom객체를 어마무시하게 사용하지는 않지만, web ui에서 반응성을 느리게 만드는 주 요인은 언제나 dom 객체이기 때문이기도 하고,

동작 연산에 불필요한 dom 객체가 있으면 아무래도 연산이 복잡해지기 때문에 각 부분에서 초기화하는거다.

연산은 언제나 간단할 수록 좋다.

**그 다음 중요한 부분은 style.transform 과 style.transition 이겠다.**

예전에 이런 스타일이 없었던 시절에는 애니메이션 ui를 위해서 다 타이머 처리하고 그랬더랬다.

요즘 점점 이런 스타일이 나와줘서 너무 편하고, 시스템 리소스도 많이 안쓸 수 있어서 좋다.

**마지막으로 짚어야 하는 부분은 minus 처리할 때에 숫자가 추가되는 방식이다.**

plus 처리할 때에야 아래에서 위로 올라오기 때문에 현재 숫자 아래에 다음 숫자를 추가해서 위로 올려주면 그만이지만,

minus 처리할 때에는 현재 숫자 위에 다음 숫자를 추가해야 하는데, 이때 현재 숫자의 위치가 바뀌면 안되기 때문에 위치를 부득이하게 지정해야 한다.

그래서 position:absolute 를 사용할 수 밖에 없다.

---

중요한 부분은 이정도겠고, 추가로 \_\_proto__ 를 사용한 프로토타입 정의도 괜찮은 방식인 것 같다.

뭔가 필요없는 소모는 하지 않는 느낌

이 소스도 언젠가 쓸 일이 있으면 좋겠다.
