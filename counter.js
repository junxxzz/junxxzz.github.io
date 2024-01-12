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
        else if( i==0 ) {
            // nomore = true;
            // fsize = numdiv.dataset.fsize;
        }
    }
    // if( nomore ) {
    //     const counterdiv = obj.querySelector('.counterdiv');
    //     const numdiv = document.createElement('div');
    //     numdiv.classList.add('numdiv');
    //     numdiv.dataset.num = '1';
    //     numdiv.dataset.y = 0;
    //     numdiv.dataset.fsize = fsize;
    //     const newnum = document.createElement('div');
    //     newnum.textContent = '1';
    //     numdiv.append(newnum);
    //     counterdiv.prepend(numdiv);
    //     numdiv.style.transition = 'ease 1s';
    // }

}