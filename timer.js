function timer(obj, start, fsize) {
    if( !fsize ) {
        fsize = 20;
    }
    if( !start ) {
        start = 0
    }
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timerDiv');
    timerDiv.textContent = '';
    timerDiv.style.display = 'flex';
    timerDiv.style.height = fsize+'px';
    timerDiv.style.maxHeight = fsize+'px';
    timerDiv.style.overflow = 'hidden';
    timerDiv.style.fontSize = fsize+'px';
    timerDiv.style.lineHeight = fsize+'px';
    obj.append(timerDiv);
    String(start).split('').forEach(s => {
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = s;
        numdiv.dataset.y = 0;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = s;
        numdiv.append(newnum);
        timerDiv.append(numdiv);
        numdiv.style.transition = 'ease 1s';
    });
}

function timerUp(obj) {
    const numdivs = obj.querySelectorAll('div.numdiv');
    let nomore = false;
    let fsize = 0;
    for( let i=(numdivs.length-1); i>=0; i-- ) {
        const numdiv = numdivs[i];
        console.log(numdivs);
        console.log(numdiv);
        numdiv.dataset.num = Number(numdiv.dataset.num) + 1;
        numdiv.dataset.y = Number(numdiv.dataset.y) + Number(numdiv.dataset.fsize);
        if( numdiv.dataset.num==10 ) {
            numdiv.dataset.num = '0';
        }
        const newnum = document.createElement('div');
        newnum.textContent = numdiv.dataset.num;
        numdiv.append(newnum);
        numdiv.style.transform = 'translateY('+String(-1*Number(numdiv.dataset.y))+'px)';
        if( numdiv.dataset.num!='0' ) {
            break;
        }
        else if( i==0 ) {
            nomore = true;
            fsize = numdiv.dataset.fsize;
        }
    }
    if( nomore ) {
        const timerDiv = obj.querySelector('.timerDiv');
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = '1';
        numdiv.dataset.y = 0;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = '1';
        numdiv.append(newnum);
        timerDiv.prepend(numdiv);
        numdiv.style.transition = 'ease 1s';
    }

}