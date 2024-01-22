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
    objonly: false,
};
var DOMJS_CHILDTAGS = {
    'div': ['div','span','table','p'],
    'table': ['tr'],
    'tr': ['td'],
    'td': ['div','span','table','p'],
};
function DOMJS(arg=[DOMJS_CHILD]) {
    window.DOMJSOBJ = this;
    this.print = () => {
        document.write(this.makeObject(arg).outerHTML);
    }
    this.attach = (obj) => {
        arg.forEach(a => {
            obj.append(this.makeObject(a));
        })
        document.querySelector('body').addEventListener('click', this.clearHelper);
    }
    // node function
    this.openModal = function() {
        const dialog = document.createElement('dialog');
        dialog.addEventListener('click', window.DOMJSOBJ.cancelEvent);
        dialog.addEventListener('close', function() { this.remove(); });
        dialog.setAttribute('id', 'domjsDialog');
        dialog.caller = this;
        const rootdiv = document.createElement('div');
        dialog.append(rootdiv);
        const fieldset = document.createElement('fieldset');
        fieldset.setAttribute('id', 'domjsDialogMessage');
        fieldset.addAttrRowDiv = function(a, v) {
            const rowdiv = document.createElement('div');
            rowdiv.classList.add('rowdiv');
            this.append(rowdiv);
            const coldiv0 = document.createElement('div');
            rowdiv.append(coldiv0);
            const newbutton = document.createElement('input');
            newbutton.classList.add('domjsDialogAttributeRemoveButton');
            newbutton.setAttribute('type', 'button');
            newbutton.setAttribute('id', `domjsDialogAttributeRemoveButton_${a}`);
            newbutton.setAttribute('value', 'X');
            coldiv0.append(newbutton);
            const coldiv1 = document.createElement('div');
            coldiv1.innerHTML = a;
            rowdiv.append(coldiv1);
            const coldiv2 = document.createElement('div');
            rowdiv.append(coldiv2);
            const newinput = document.createElement('input');
            newinput.setAttribute('type', 'text');
            newinput.setAttribute('id', `domjsDialogAttribute_${a}`);
            newinput.setAttribute('value', v);
            coldiv2.append(newinput);
        }
        fieldset.newAttrRowDiv = function(a, v) {
            const rowdiv = document.createElement('div');
            rowdiv.classList.add('rowdiv');
            this.querySelector('#domjsDialogRowDivAction0').before(rowdiv);
            const coldiv0 = document.createElement('div');
            rowdiv.append(coldiv0);
            const newbutton = document.createElement('input');
            newbutton.classList.add('domjsDialogAttributeRemoveButton');
            newbutton.setAttribute('type', 'button');
            newbutton.setAttribute('id', `domjsDialogAttributeRemoveButton_${a}`);
            newbutton.setAttribute('value', 'X');
            coldiv0.append(newbutton);
            const coldiv1 = document.createElement('div');
            rowdiv.append(coldiv1);
            const newinput0 = document.createElement('input');
            newinput0.setAttribute('type', 'text');
            newinput0.setAttribute('id', `domjsDialogAttribute_${a}`);
            // newinput0.setAttribute('value', v);
            coldiv1.append(newinput0);
            const coldiv2 = document.createElement('div');
            rowdiv.append(coldiv2);
            const newinput = document.createElement('input');
            newinput.setAttribute('type', 'text');
            newinput.setAttribute('id', `domjsDialogAttribute_${a}`);
            // newinput.setAttribute('value', v);
            coldiv2.append(newinput);
        }
        rootdiv.append(fieldset);
        this.getAttributeNames().forEach(a => {
            const v = this.getAttribute(a);
            fieldset.addAttrRowDiv(a, v);
        });
        const rowdiv = document.createElement('div');
        rowdiv.classList.add('rowdiv');
        rowdiv.setAttribute('id', 'domjsDialogRowDivAction0');
        fieldset.append(rowdiv);
        const coldiv0 = document.createElement('div');
        rowdiv.append(coldiv0);
        const coldiv1 = document.createElement('div');
        rowdiv.append(coldiv1);
        const coldiv2 = document.createElement('div');
        rowdiv.append(coldiv2);
        const newinput = document.createElement('input');
        newinput.setAttribute('type', 'button');
        newinput.setAttribute('id', `domjsDialogAttributeAddButton`);
        newinput.setAttribute('value', '속성추가');
        newinput.addEventListener('click', function() {
            this.parentElement.parentElement.parentElement.newAttrRowDiv();
        })
        coldiv2.append(newinput);

        const buttondiv = document.createElement('div');
        buttondiv.setAttribute('id', 'domjsDialogButtons');
        rootdiv.append(buttondiv);
        const okbutton = document.createElement('input');
        okbutton.setAttribute('type', 'button');
        okbutton.setAttribute('id', 'domjsDialogOkButton');
        okbutton.setAttribute('value', 'SAVE');
        okbutton.addEventListener('click', () => this.closeModal(true));
        buttondiv.append(okbutton);
        const cancelbutton = document.createElement('input');
        cancelbutton.setAttribute('type', 'button');
        cancelbutton.setAttribute('id', 'domjsDialogCancelButton');
        cancelbutton.setAttribute('value', 'CANCEL');
        cancelbutton.addEventListener('click', () => this.closeModal(false));
        buttondiv.append(cancelbutton);
        document.querySelector('body').append(dialog);
        dialog.showModal();
    }
    this.closeModal = function(payload) {
        document.querySelector('dialog#domjsDialog')?.close();
    }
    this.clearHelper = function() {
        document.querySelector('#domjsContextMenu')?.remove();
        window.DOMJSOBJ.closeModal(false);
    }
    this.cancelEvent = function(evt) {
        evt.cancelBubble = true;
        evt.defaultPrevented = true;
        evt.returnValue = null;
    }
    this.clickEvent = function(evt) {
        window.DOMJSOBJ.clearHelper();
        window.DOMJSOBJ.cancelEvent(evt);
        if( evt.ctrlKey ) {
            this.openModal();
        }
    }
    this.contextEvent = function(evt) {
        window.DOMJSOBJ.clearHelper();
        window.DOMJSOBJ.cancelEvent(evt);
        const newdiv = document.createElement('div');
        newdiv.addEventListener('click', window.DOMJSOBJ.cancelEvent);
        newdiv.setAttribute('id', 'domjsContextMenu');
        newdiv.style.position = 'absolute';
        newdiv.style.width = '100px';
        newdiv.style.height = '100px';
        newdiv.style.backgroundColor = 'gray';
        const availableTags = DOMJS_CHILDTAGS[String(this.tagName).toLowerCase()];
        newdiv.style.top = `${evt.y}px`;
        newdiv.style.left = `${evt.x}px`;
        if( !availableTags ) {
            newdiv.innerHTML = '하위 오브젝트를 추가할 수 있는 오브젝트가 아닙니다.';
        }
        else {
            availableTags.forEach(a => {
                console.log(a);

            });
        }
        document.querySelector('body').append(newdiv);
    }
    // end of node function
    /**
     * @param DOMJS_CHILD arg
     * @returns object
     */
    this.makeObject = (arg=DOMJS_CHILD) => {
        let newobj;
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
            if( !arg.objonly ) {
                newobj.openModal = window.DOMJSOBJ.openModal;
                newobj.closeModal = window.DOMJSOBJ.closeModal;
                newobj.addEventListener('click', window.DOMJSOBJ.clickEvent);
                newobj.addEventListener('contextmenu', window.DOMJSOBJ.contextEvent);
            }
            if( arg.children && arg.children.length ) {
                arg.children.forEach(child => {
                    newobj.append(this.makeObject(child));
                });
            }
        }
        return newobj;
    };
}
function domjsDialogClose(arg) {
    document.querySelector('dialog#domjsDialog').close();
}


const domconfig = [{
    tagname: 'div',
    attrs: {
        id: 'aaaa',
    },
    children: [
        {
            tagname: 'span',
            attrs: {
                class: 'class1',
                aaaclass: 'aaaclass1',
            },
            children: [
                {
                    tagname: 'text',
                    contents: 'test',
                },
            ],
        },
    ],
}];
const dom1 = new DOMJS(domconfig);
dom1.attach(document.querySelector('body'));
document.querySelector('#domjson').value = JSON.stringify(domconfig);
