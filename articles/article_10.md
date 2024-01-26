## CSS (Cascading Style Sheets) - 이것만 알아도 페이지 레이아웃은 충분하다.

---

웹개발자 중에는 의외로 css를 잘 모르는 개발자가 많다.

그래서 꼭 알아야 되는, 이정도만 알아도 레이아웃 정도는 충분히 잡을 수 있는 css를 알려주려고 한다.

# color

당연하게도 색상을 지정하는 속성이다. 값에는 색상에 대한 **영문명**이나, **헥스코드**, **rgb()** 나 **rgba()** 함수를 이용한 rgb값을 넣을 수 있다.

추가로 color(), hsl() 등의 색상 표현 함수가 더 있지만, 몰라도 된다.

**영문명**은 당연히 누구나 알고 있는 그 영어단어를 말한다. 흰색은 white고 검은색은 black이고, 빨간색은 red고.. 뭐 그렇다.

**헥스코드**는 포토샵이라던가, 각종 그래픽 툴을 이용하다보면 사용하게 되는, #으로 시작하는 그 코드이다.

색상값 r, g, b를 0부터 255까지 표현할 수 있는 2바이트 문자를 연이어서 6자리로 표현한다.

흰색은 #ffffff, 검은색은 #000000, 빨간색은 #ff0000 이런식이고,

r, g, b에 해당하는 2바이트의 문자가 같은 값이라면 줄여서 #fff, #000, #f00 이렇게도 사용 가능하다.

**rgb()** 함수는 css에서 사용하는 컬러 표현식 중 하나로 인자로 r, g, b 세개 값을 입력할 수 있다.

각 값은 0부터 255까지 사용할 수 있다.

흰색은 rgb(255,255,255), 검은색은 rgb(0,0,0), 빨간색은 rgb(255,0,0) 이런식이다.

**rgba()** 역시 css에서 사용하는 컬러 표현식 중 하나인데, rgb()와 다른 점은 rgb()함수의 3개 인자에 추가로 알파(alpha)값-투명도-를 입력할 수 있다.

알파값은 0부터 1까지의 소숫점은 포함한 percentage를 의미한다. 0은 0%, 1은 100%인 셈이다. 100%는 완전 불투명, 즉 그냥 그 색상이다.

즉, rgba(255,255,255,0.5)는 흰색인데 투명도가 50%인 흰색을 말한다.

**최근에는** rgba() 함수의 기능을 rgb()함수가 전부 가져가서 추가로 알파값을 넣을 수 있는데, 사용법이 조금 다르다.

rgb(255 0 0 / 50%) 이런식이다. "," 대신 띄어쓰기로 구분할 수 있게 됐고, 알파값을 넣으려면 "/"로 구분해야 한다.

```html
이건 <span style="color: red;">빨강</span>, <span style="color: rgb(0,0,255);">파랑</span>, <span style="color: rgba(0, 255, 0, 0.2);">20% 녹색</span>
```

> 이건 <span style="color: red;">빨강</span>, <span style="color: rgb(0,0,255);">파랑</span>, <span style="color: rgba(0, 255, 0, 0.2);">20% 녹색</span>


# background-color

배경 색상을 지정하는 속성이다.

값에는 color에 사용했던 내용을 모두 사용할 수 있다.

```html
이건 <span style="background-color: red;">빨강</span>, <span style="background-color: rgb(0,0,255);">파랑</span>, <span style="background-color: rgba(0, 255, 0, 0.2);">20% 녹색</span>
```

> 이건 <span style="background-color: red;">빨강</span>, <span style="background-color: rgb(0,0,255);">파랑</span>, <span style="background-color: rgba(0, 255, 0, 0.2);">20% 녹색</span>

# font-size

글꼴의 사이즈를 지정하는 속성이다. 글자의 높이 길이를 의미한다.

값에는 px, em, rem, % 등 길이 단위를 붙여서 사용하는데,

px는 픽셀 단위이니 당연히 절대값이다.

em, %는 부모 엘리먼트에 적용된 사이즈의 비율로 설정한다. 1em이 100%와 같다.

rem은 어디에서 사용하든지 root 엘리먼트, 즉 \<html\>에 적용된 사이즈를 기준으로 한 비율이다. em과 마찬가지로 1rem이 100%를 의미한다.

일반적으로 웹브라우저의 기본 폰트 사이즈는 16px 정도이며, 아무런 설정도 하지 않은 경우에는 당연히 1rem과 1em이 같다.

```html
<div style="font-size: initial">
    기본사이즈,
    <span style="font-size: 16px;">16px</span>,
    <span style="font-size: 1rem;">1rem</span>
    <div style="font-size: 67%;">
        67%,
        <span style="font-size: 1.49em;">67%의 1.49em</span>,
        <span style="font-size: 1rem;">1rem</span>
    </div>
</div>
```

> <p></p>
> <div style="font-size: initial">
>     기본사이즈,
>     <span style="font-size: 16px;">16px</span>,
>     <span style="font-size: 1rem;">1rem</span>
>     <div style="font-size: 67%;">
>         67%,
>         <span style="font-size: 1.49em;">67%의 1.49em</span>,
>         <span style="font-size: 1rem;">1rem</span>
>     </div>
> </div>
> <p></p>

# display

엘리먼트의 출력 형태를 결정하는 속성이다.

값으로는 inline, block, inline-block, table, flex, grid, inline-flex 등등 정의돼있는 키워드를 사용한다.

웹페이지에서 각 엘리먼트는 각자의 기본 출력 형태가 정해져있다.

span 태그는 inline 형태이고, div 태그는 block 형태이고, table 태그는 table 형태이다.

display의 값으로 사용할 수 있는 그 많은 키워드 중에 **inline**, **block**, **inline-block**, **flex** 정도는 반드시 알아둬야 한다.

**inline**과 **block**은 반대되는 개념이라고 보면 되는데,

두가지의 가장 큰 차이점은 옆에 다른 엘리먼트가 있을 수 있는가. 이다.

inline은 다른 엘리먼트가 옆에 붙어서 출력되고,

block은 다른 엘리먼트가 무조건 다음줄로 출력된다.

또 한가지 차이점은 너비와 높이를 지정할 수 있는가. 이다.

inline은 너비와 높이를 지정할 수 없고, block은 할 수 있다.

```html
<div style="display: inline; width: 300px; background-color: rgba(100,100,100,0.4);">
    첫번째 DIV
</div>
<div style="display: inline;">
    두번째 DIV
</div>
```

> <p></p>
> <div style="display: inline; width: 300px; background-color: rgba(100,100,100,0.4);">
>     첫번째 DIV
> </div>
> <div style="display: inline;">
>     두번째 DIV
> </div>
>
> div 이지만, 옆으로 붙여서 출력되고, 너비도 지정되지 않는다.

```html
<span style="display: block; width: 300px; background-color: rgba(100,100,100,0.4);">
    첫번째 SPAN
</span>
<span style="display: block;">
    두번째 SPAN
</span>
```

> <p></p>
> <span style="display: block; width: 300px; background-color: rgba(100,100,100,0.4);">
>     첫번째 SPAN
> </span>
> <span style="display: block;">
>     두번째 SPAN
> </span>
>
> span 이지만, 아래로 떨어져서 출력되고, 너비도 지정된다.

**inline-block**은 inline과 block을 적절히 섞은거라고 할 수 있다.

다른 엘리먼트가 옆에 붙어서 출력되지만, 너비와 높이를 지정할 수 있다.

```html
<div style="display: inline-block; width: 150px; background-color: rgba(100,100,100,0.4);">
    첫번재 엘리먼트
</div>
<span style="display: inline-block; width: 150px; background-color: rgba(200,200,200,0.4);">
    두번재 엘리먼트
</span>
<span style="display: inline-block;">
    세번재 엘리먼트
</span>
```

> <p></p>
> <div style="display: inline-block; width: 150px; background-color: rgba(100,100,100,0.4);">
>     첫번재 엘리먼트
> </div>
> <span style="display: inline-block; width: 150px; background-color: rgba(200,200,200,0.4);">
>     두번재 엘리먼트
> </span>
> <span style="display: inline-block;">
>     세번재 엘리먼트
> </span>
>
> div, span 상관없이 모두 옆으로 붙고, 너비도 지정된다.

마지막으로 **flex**는 최근 들어 아주 잘 써먹고 있는 것인데, 레이아웃을 잡기 위해서 나온 거라고 단언해서 말해도 무방한 녀석이다.

display가 flex인 엘리먼트의 내부에 들어가는 직속 자식 엘리먼트들은 자동으로 분할돼서 출력된다. 너무 좋다.

```html
<div style="display: flex;">
    <div style="background-color: red;">첫번째 DIV</div>
    <div style="background-color: green;">두번째 DIV</div>
    <div style="background-color: blue;">새번째 DIV</div>
</div>
<span style="display: flex;">
    <span style="background-color: red;">첫번째 SPAN</span>
    <span style="background-color: green; width: 300px;">두번째 SPAN</span>
    <span style="background-color: blue;">새번째 SPAN</span>
</span>
<div style="display: flex;">
    <div style="background-color: red; flex: 1;">첫번째 DIV</div>
    <div style="background-color: green; flex: 2;">두번째 DIV</div>
    <div style="background-color: blue; flex: 3;">새번째 DIV</div>
</div>
```

> <p></p>
> <div style="display: flex;">
>     <div style="background-color: red;">첫번째 DIV</div>
>     <div style="background-color: green;">두번째 DIV</div>
>     <div style="background-color: blue;">새번째 DIV</div>
> </div>
> <span style="display: flex;">
>     <span style="background-color: red;">첫번째 SPAN</span>
>     <span style="background-color: green; width: 300px;">두번째 SPAN</span>
>     <span style="background-color: blue;">새번째 SPAN</span>
> </span>
> <div style="display: flex;">
>     <div style="background-color: red; flex: 1;">첫번째 DIV</div>
>     <div style="background-color: green; flex: 2;">두번째 DIV</div>
>     <div style="background-color: blue; flex: 3;">새번째 DIV</div>
> </div>
>
> flex는 기본적으로 block 상태를 가지고 가기에, div에 적용하든, span에 적용하든 같은 결과가 된다.
> 또한, 직속 자식 엘리먼트는 자동으로 inline-block 과 같은 상태가 되고, 너비를 지정하지 않으면 해당 엘리먼트의 컨텐츠에 따라 자동으로 너비가 지정된다.
> 직속 자식 엘리먼트들의 너비 분배를 비율로 하고 싶을때 flex 라는 속성을 사용하게 되는데, 값으로 사용하고 싶은 비율을 작성하면 flex 속성을 사용한 형제 엘리먼트들과 알아서 비율에 맞춰서 남은 너비를 나눠가진다.
> 만약 형제 엘리먼트중 혼자만 flex 속성을 갖고 있다면, 남은 너비를 모두 갖는다.

# position

웹페이지의 레이아웃을 잡기 위해서는 반드시 사용한다고 봐도 좋을 position속성은 엘리먼트의 위치 선정을 어떤 방법으로 할 것인지 지정하는 속성이다.

말이 어렵긴 한데, 직접 사용해 보면 쉽다.

값으로는 **relative**, **absolute**, **fixed**, **static**, **sticky** 등의 키워드를 사용한다.

모든 엘리먼트의 position 기본값은 **static** 이고, static인 상태에서는 position과 함께 사용되는 top, left, right, bottom, z-index 속성이 적용되지 않는다.

**relative**는 웹페이지를 일단 출력한 뒤 relative가 적용된 엘리먼트를 top, left, right, bottom 속성 값에 따라 이동 시킨다.

다른 엘리먼트에 영향을 끼치지 않으며, 자기 자신만 이동한다.

```html
<div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
<div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: relative; left: 25px; top: 25px;">두번째 박스</div>
<div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
```

> <p></p>
> <div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
> <div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: relative; left: 25px; top: 25px;">두번째 박스</div>
> <div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
> <p></p>

**absolute**는 웹페이지 내에 자기가 차지하고 있던 영역은 없애버리고 부모 엘리먼트 중 position이 relative인 가장 가까운 엘리먼트의 위치를 기준으로 삼는다.

만약 부모 엘리먼트 중 position이 relative인 엘리먼트가 없다면 해당 엘리먼트는 root 엘리먼트, 즉 html 이 된다.

```html
<div style="position: relative;">
    <div style="height: 50px; background-color: rgba(100,100,100,0.2);">
        position 적용이 안된 div
    </div>
    <div style="height: 50px;">
        <div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
        <div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: absolute; left: 25px; top: 25px;">두번째 박스</div>
        <div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
    </div>
</div>
```

> <p></p>
> <div style="position: relative;">
>     <div style="height: 50px; background-color: rgba(100,100,100,0.2);">
>         position 적용이 안된 div
>     </div>
>     <div style="height: 50px;">
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: absolute; left: 25px; top: 25px;">두번째 박스</div>
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
>     </div>
> </div>
> <p></p>

**sticky**는 relative처럼 먼저 웹페이지를 출력해서 엘리먼트의 위치를 결정한 뒤, 가장 가까운 스크롤 항목 내부에서 스크롤 바를 기준으로 지정된 위치에 엘리먼트가 유지될 수 있도록 해준다.

위치 고정은 가장 가까운 display: block; 인 부모 엘리먼트를 기준으로 이루어지기 때문에 해당 부모 엘리먼트가 스크롤 영역을 벗어나면 위치 고정은 해제된다.

말이 어려운데, 실제로 해봐도 어렵다; 그냥 경험으로 익히는 수 밖에 없다.

```html
<div style="overflow: scroll; height: 200px;">
    <div style="width: 100vw; height: 100vh; background-color: rgba(100,100,100,0.2);">
        <div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
        <div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: sticky; left: 25px; top: 25px;">두번째 박스</div>
        <div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
    </div>
    <div style="width: 100vw; height: 100vh; background-color: rgba(200,200,200,0.2);">다른 DIV</div>
</div>
```

> <p></p>
> <div style="overflow: scroll; height: 200px;">
>     <div style="width: 100vw; height: 100vh; background-color: rgba(100,100,100,0.2);">
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: red;">첫번째 박스</div>
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: green; position: sticky; left: 25px; top: 25px;">두번째 박스</div>
>         <div style="display: inline-block; width: 50px; height: 50px; background-color: blue;">세번째 박스</div>
>     </div>
>     <div style="width: 100vw; height: 100vh; background-color: rgba(200,200,200,0.2);">다른 DIV</div>
> </div>
>
> "다른 DIV"가 스크롤 영역을 모두 차지하게 되면 위치를 고정하고 있던 엘리먼트는 부모 엘리먼트와 함께 스크롤된다.

**fixed**는 absolute처럼 웹페이지에서 자기가 차지하고 있던 영역은 없애버리고 페이지 전체를 기준으로 지정된 위치에 고정된다.

고민없이 조건없이 어딘가 위치에 고정시켜버리고 싶을 때 사용하면 된다.

```html
<a name="fixed"></a>
<div style="position: fixed; right: 0; top: 50%;">여기에 고정</div>
```

> <a name="fixed"></a>
> <div style="position: fixed; right: 0; top: 50%;"><a href="#fixed" >여기에 고정</a></div>
>
> 여기에 위 소스를 실행하고 있다.

---

# 웹페이지를 깔끔하게 정돈된 느낌이 들게 만드는 원칙

말 그대로 깔끔해 보이게 해주는 방법이 있다. 예쁘게 보이려면 디자이너가 디테일을 살려주면 될 일이지만, 이 몇가지 원칙만 지키면 깔끔 정돈된 느낌 정도는 쉽게 만들 수 있다.

**1. 글꼴 크기를 3, 4 단계로 지정해라**

제목이라면 1.1rem, 본문이라면 0.8rem, 헤더부분이라면 1.5rem 등 웹페이지에서 사용할 용도에 맞게 미리 font-size를 지정해 두면 매법 페이지마다 고민할 필요도 없고, 통일된 느낌을 줄 수 있다.

이런 방법을 사용하기 위해서 **var()**라는 함수가 존재한다.

**var()** 함수의 인자로 변수명을 넣을 수 있고, 변수는 아래와 같이 지정할 수 있다.

```css
html {
    /* --fontsize-title 이라는 변수에 1.1rem 값을 할당한다. */
    --fontsize-title: 1.1rem;
    --fontsize-contents: 0.8rem;
    --fontsize-header: 1.5rem;
}
.title {
    /* 사용할 때는 이렇게 한다. */
    font-size: var(--fontsize-title);
}
```

**2. 웹페이지에서 사용할 색상을 3, 4 가지 색상으로 제한해라**

웹페이지를 만들다보면 여기는 좀더 강조하고 싶으니까 무슨색, 여기는 또 다른 항목이니까 또 무슨색.. 이렇게 점점 사용하는 색상이 불어나게 된다.

알록달록한게 이쁜건 애기들 옷에나 적용되는 말이다.

정 색상 지정을 못하겠다면, https://designs.ai/colors 이런 사이트도 있으니 이용해 보는 것도 좋다.

색상도 font-size와 마찬가지로 변수화하면 사용하기 편하다.

**3. 여백 사이즈를 통일해라**

페이지의 헤더랑 메인이랑 사이에는 10px, 메인이랑 푸터 사이에는 15px, 메인 내부에 메뉴랑 컨텐츠 사이에는 5px, 컨텐츠 내부에 카드 리스트들 사이에는 13px.. 이런 식으로 여백을 중구난방으로 사용하는 경우가 많이 있다.

여백이 디자인 요소로 사용되는 경우도 많이 있긴 하지만, 웹페이지가 산만하게 느껴진다면 이 여백 문제일지도 모른다.

일단 여백을 다 1em으로 바꾸고 생각해봐라. 1em으로 여백을 주면 해당 엘리먼트에 적용된 폰트 사이즈의 영향을 받기 때문에 모든 여백이 동일하지는 않을테지만, 비율이라는 면에서 통일되고 해당하는 컨텐츠에 따라 여백이 맞춰지니 편리해진다.

그리고도 조금 변화를 주고 싶다면, font-size에서 했던 것처럼 변수화하고 통일시켜라.

**4. 컨텐츠 사이사이에 변화를 주고 싶다면 배경색상을 넣어줘라**

배경색이 전부 흰색이라 밋밋해서 못봐주겠다면 중간에 다른 컨텐츠가 들어가는 부분에 배경색상을 넣어주면 좋다.

색상을 정하는게 힘들다면 고민하지 말고 rgba(100,100,100,0.2) 이거다.

