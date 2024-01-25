var DOMJS_GLOBAL_ATTRIBUTES = {
    accesskey: '',
    autocapitalize: '',
    autofocus: '',
    class: '',
    dir: '',
    draggable: '',
    enterkeyhint: '',
    exportparts: '',
    hidden: '',
    id: '',
    inert: '',
    inputmode: '',
    is: '',
    itemid: '',
    itemprop: '',
    itemref: '',
    itemscope: '',
    itemtype: '',
    lang: '',
    nonce: '',
    part: '',
    popover: '',
    role: '',
    slot: '',
    spellcheck: 'false',
    style: '',
    tabindex: '',
    title: '',
    translate: '',
};
var DOMJS_CHILD = {
    tagname: '',
    attrs: DOMJS_GLOBAL_ATTRIBUTES,
    children: [DOMJS_CHILD],
    contents: '',
};
/**
 * @constructor
 * @param {DOMJS_CHILD[]} arg
 */
DOMJS = function(arg=[DOMJS_CHILD]) {
    if( !window.DOMJSOBJ ) {
        window.DOMJSOBJ = this;
    }
    this.print = () => {
        document.write(this.makeObject(arg).outerHTML);
    }
    this.attach = (obj) => {
        arg.forEach(a => {
            obj.append(this.makeObject(a));
        });
        if( window.DOMJSOBJ?.useExtend ) {
            obj.classList.add('domjsRoot');
            obj.addEventListener('contextmenu', window.DOMJSOBJ.contextEvent);
            window.DOMJSOBJ.sortrables.push(Sortable.create(obj, sortableConfig_common));
        }
        document.querySelector('body').addEventListener('click', window.DOMJSOBJ?.clearHelper);
    }
    /**
     * @param DOMJS_CHILD arg
     * @returns object
     */
    this.makeObject = (arg=DOMJS_CHILD) => {
        let newobj;
        arg.tagname = String(arg.tagname).toLowerCase();
        if( arg.tagname=='text' ) {
            newobj = new Text(arg.contents);
        }
        else {
            newobj = document.createElement(arg.tagname);
            for( const k in arg.attrs ) {
                if( String(k).match(/^data-/) ) {
                    newobj.setAttribute(k, v);
                }
                else if( Object.hasOwnProperty.call(DOMJS_GLOBAL_ATTRIBUTES, k) ) {
                    const v = arg.attrs[k];
                    if( String(v).length ) {
                        newobj.setAttribute(k, v);
                    }
                }
            }
            if( window.DOMJSOBJ?.useExtend ) {
                newobj.setAttribute('data-obj-for-extend', arg.tagname);
                newobj.openModal = window.DOMJSOBJ.openModal;
                newobj.closeModal = window.DOMJSOBJ.closeModal;
                newobj.addEventListener('click', window.DOMJSOBJ.clickEvent);
                newobj.addEventListener('contextmenu', window.DOMJSOBJ.contextEvent);
            }
            if( arg.children && arg.children.length ) {
                arg.children.forEach(child => {
                    newobj.append(this.makeObject(child));
                });
                if( window.DOMJSOBJ?.useExtend ) {
                    window.DOMJSOBJ.attachSortable(newobj);
                }
            }
            else if( arg.contents ) {
                newobj.innerHTML = arg.contents;
                if( window.DOMJSOBJ?.useExtend ) {
                    newobj.setAttribute('data-contents-for-extend', encodeURIComponent(arg.contents));
                }
            }
        }
        return newobj;
    }
    this.newElement = function() {
        const newelement = document.createElement(arguments[0]);
        arguments[0] = newelement;
        this.attr.apply(this, arguments);
        return newelement;
    }
    this.attr = function() {
        if( arguments.length%2 != 1 ) {
            throw "invalid argument length"
        }
        for( let i=1; i<arguments.length; i=i+2 ) {
            arguments[0].setAttribute(arguments[i], arguments[i+1]);
        }
    }
}
