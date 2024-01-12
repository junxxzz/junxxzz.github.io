function timer(obj, start, fsize) {
    if( !fsize ) {
        fsize = 20;
    }
    if( !start ) {
        start = 0
    }
    const timerdiv = document.createElement('div');
    timerdiv.classList.add('timerdiv');
    timerdiv.dataset.nownum = start;
    timerdiv.textContent = '';
    timerdiv.style.display = 'flex';
    timerdiv.style.height = fsize+'px';
    timerdiv.style.maxHeight = fsize+'px';
    timerdiv.style.overflow = 'hidden';
    timerdiv.style.fontSize = fsize+'px';
    timerdiv.style.lineHeight = fsize+'px';
    obj.append(timerdiv);
    String(start).split('').forEach(s => {
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = s;
        numdiv.dataset.y = 1;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = s;
        numdiv.append(newnum);
        timerdiv.append(numdiv);
        numdiv.style.transition = 'ease 1s';
    });
}

function timerUp(obj) {
    const timerdiv = obj.querySelector('div.timerdiv');
    timerdiv.dataset.nownum = Number(timerdiv.dataset.nownum) + 1;
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
        const timerdiv = obj.querySelector('.timerdiv');
        const numdiv = document.createElement('div');
        numdiv.classList.add('numdiv');
        numdiv.dataset.num = '1';
        numdiv.dataset.y = 1;
        numdiv.dataset.fsize = fsize;
        const newnum = document.createElement('div');
        newnum.textContent = '1';
        numdiv.append(newnum);
        timerdiv.prepend(numdiv);
        numdiv.style.transition = 'ease 1s';
    }

}

function timerDown(obj) {
    const timerdiv = obj.querySelector('div.timerdiv');
    if( timerdiv.dataset.nownum=='0' ) {
        return;
    }
    timerdiv.dataset.nownum = Number(timerdiv.dataset.nownum) - 1;
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
        else if( i==0 ) {
            // nomore = true;
            // fsize = numdiv.dataset.fsize;
        }
    }
    // if( nomore ) {
    //     const timerdiv = obj.querySelector('.timerdiv');
    //     const numdiv = document.createElement('div');
    //     numdiv.classList.add('numdiv');
    //     numdiv.dataset.num = '1';
    //     numdiv.dataset.y = 0;
    //     numdiv.dataset.fsize = fsize;
    //     const newnum = document.createElement('div');
    //     newnum.textContent = '1';
    //     numdiv.append(newnum);
    //     timerdiv.prepend(numdiv);
    //     numdiv.style.transition = 'ease 1s';
    // }

}