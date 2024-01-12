function timer_exec() {
    if( typeof timer=='function' ) {
        timer(document.querySelector('#timer'),5,50);
    }
    else {
        window.setTimeout(timer_exec, 100);
    }
}
timer_exec();

let interval_timerUp;
let interval_timerDown;
function timerUp_once(obj) {
    window.clearInterval(window.interval_timerUp);
    window.clearInterval(window.interval_timerDown);
    timerUp(obj);
}
function timerDown_once(obj) {
    window.clearInterval(window.interval_timerUp);
    window.clearInterval(window.interval_timerDown);
    timerDown(obj);
}
function timerUp_linear(obj) {
    window.clearInterval(window.interval_timerUp);
    window.clearInterval(window.interval_timerDown);
    window.interval_timerUp = window.setInterval(()=>{
        timerUp(obj);
    },100);
}
function timerDown_linear(obj) {
    window.clearInterval(window.interval_timerUp);
    window.clearInterval(window.interval_timerDown);
    window.interval_timerDown = window.setInterval(()=>{
        timerDown(obj);
    },100);
}