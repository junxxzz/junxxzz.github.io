function counter_exec() {
    if( typeof counter=='function' ) {
        counter(document.querySelector('#counter'),document.querySelector('#counter').innerHTML,50);
        counter(document.querySelector('#counter1'),document.querySelector('#counter1').innerHTML,50);
        counter(document.querySelector('#counter2'),document.querySelector('#counter2').innerHTML,50);
    }
    else {
        window.setTimeout(counter_exec, 100);
    }
}
counter_exec();

var interval_counterUp;
var interval_counterDown;
function counterUp_once(obj) {
    window.clearInterval(window.interval_counterUp);
    window.clearInterval(window.interval_counterDown);
    counterUp(obj);
}
function counterDown_once(obj) {
    window.clearInterval(window.interval_counterUp);
    window.clearInterval(window.interval_counterDown);
    counterDown(obj);
}
function counterUp_linear(obj) {
    window.clearInterval(window.interval_counterUp);
    window.clearInterval(window.interval_counterDown);
    window.interval_counterUp = window.setInterval(()=>{
        counterUp(obj);
    },100);
}
function counterDown_linear(obj) {
    window.clearInterval(window.interval_counterUp);
    window.clearInterval(window.interval_counterDown);
    window.interval_counterDown = window.setInterval(()=>{
        counterDown(obj);
    },100);
}