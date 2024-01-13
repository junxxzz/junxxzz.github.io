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