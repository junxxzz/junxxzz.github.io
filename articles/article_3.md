## Sliding Counter

---

쓸데가 있을지 모르겠지만, 그냥 만들어봤다.

<div id="counter">0</div>
<input type="button" value="up" onclick="counterUp_once(document.querySelector('#counter'))">
<input type="button" value="down" onclick="counterDown_once(document.querySelector('#counter'))">
<input type="button" value="up_linear" onclick="counterUp_linear(document.querySelector('#counter'))">
<input type="button" value="down_linear" onclick="counterDown_linear(document.querySelector('#counter'))">

<div id="counter1">12345</div>
<input type="button" value="up" onclick="counterUp_once(document.querySelector('#counter1'))">
<input type="button" value="down" onclick="counterDown_once(document.querySelector('#counter1'))">
<input type="button" value="up_linear" onclick="counterUp_linear(document.querySelector('#counter1'))">
<input type="button" value="down_linear" onclick="counterDown_linear(document.querySelector('#counter1'))">

<script src="/counter.js"></script>
<script src="/counter_exec.js"></script>

근데 0이 아닌 숫자로 시작했을 경우에 그 숫자보다 아래로 내려가는 경우의 애니메이션 처리를 어케 해야 하는지 도통 생각이 안난다.