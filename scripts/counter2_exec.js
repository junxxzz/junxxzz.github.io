function counter_exec() {
    if( typeof counter=='function' ) {
        window.c = counter(document.querySelector('#counter'), 999);
        window.c1 = counter(document.querySelector('#counter1'), 12345, 100);
    }
    else {
        window.setTimeout(counter_exec, 100);
    }
}
counter_exec();