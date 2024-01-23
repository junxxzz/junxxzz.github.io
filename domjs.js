/**
 * @namespace namespace
 */
var DOMJS_GLOBAL_ATTRIBUTES = {
    /**
     * @type string
     * @default ""
     */
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
    /**
     * @type string
     * @default "false"
     * @enum "true"|"false"
     */
    spellcheck: 'false',
    style: '',
    tabindex: '',
    title: '',
    translate: '',
};
/**
 * @namespace DOMJS_CHILD
 */
var DOMJS_CHILD = {
    tagname: '',
    attrs: DOMJS_GLOBAL_ATTRIBUTES,
    children: [DOMJS_CHILD],
    contents: '',
    objonly: false,
};
/**
 * @namespace DOMJS_CHILDTAGS
 */
var DOMJS_CHILDTAGS = {
    'div': ['div','span','table','p'],
    'table': ['tr'],
    'tr': ['td'],
    'td': ['div','span','table','p'],
};
/**
 * @constructor
 * @param {DOMJS_CHILD[]} arg
 */
DOMJS = function(arg=[DOMJS_CHILD]) {
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
    // node function
    this.openModal = function() {
        const dialog = window.DOMJSOBJ.newElement('dialog', 'id', 'domjsDialog');
        dialog.addEventListener('click', window.DOMJSOBJ.cancelEvent);
        dialog.addEventListener('close', function() {
            // this is dialog
            this.remove();
        });
        // this is caller object
        dialog.caller = this;
        this.dialog = dialog;

        const rootdiv = window.DOMJSOBJ.newElement('div');
        dialog.append(rootdiv);

        const fieldset = window.DOMJSOBJ.newElement('fieldset', 'id', 'domjsDialogMessage');
        fieldset.addAttrRow = function(a, v) {
            const rowdiv = window.DOMJSOBJ.newElement('div', 'class', 'rowdiv');
            // this is fieldset
            this.append(rowdiv);

            const coldiv0 = window.DOMJSOBJ.newElement('div');
            rowdiv.append(coldiv0);

            const deleteButton = window.DOMJSOBJ.newElement('input', 'class', 'domjsDialogAttributeRemoveButton', 'type', 'button', 'id', `domjsDialogAttributeRemoveButton_${a}`, 'value', 'X');
            deleteButton.addEventListener('click', function() {
                this.parentElement.parentElement.remove();
            });
            coldiv0.append(deleteButton);

            const coldiv1 = window.DOMJSOBJ.newElement('div');
            coldiv1.innerHTML = a;
            rowdiv.append(coldiv1);

            const coldiv2 = window.DOMJSOBJ.newElement('div');
            rowdiv.append(coldiv2);

            const newinput = window.DOMJSOBJ.newElement('input', 'type', 'text', 'id', `domjsDialogAttribute_${a}`, 'value', v);
            coldiv2.append(newinput);
        }
        fieldset.newAttrRow = function(a, v) {
            const rowdiv = window.DOMJSOBJ.newElement('div', 'class', 'rowdiv');
            // this is fieldset
            this.querySelector('#domjsDialogActionDiv').before(rowdiv);

            const coldiv0 = window.DOMJSOBJ.newElement('div');
            rowdiv.append(coldiv0);

            const deleteButton = window.DOMJSOBJ.newElement('input', 'class', 'domjsDialogAttributeRemoveButton', 'type', 'button', 'value', 'X');
            deleteButton.addEventListener('click', function() {
                this.parentElement.parentElement.remove();
            });
            coldiv0.append(deleteButton);

            const coldiv1 = window.DOMJSOBJ.newElement('div');
            rowdiv.append(coldiv1);

            const newinput0 = window.DOMJSOBJ.newElement('input', 'type', 'text');
            coldiv1.append(newinput0);

            const coldiv2 = window.DOMJSOBJ.newElement('div');
            rowdiv.append(coldiv2);

            const newinput = window.DOMJSOBJ.newElement('input', 'type', 'text');
            coldiv2.append(newinput);
        }
        rootdiv.append(fieldset);

        this.getAttributeNames().forEach(a => {
            const v = this.getAttribute(a);
            fieldset.addAttrRow(a, v);
        });

        const rowdiv = window.DOMJSOBJ.newElement('div', 'id', 'domjsDialogActionDiv');
        fieldset.append(rowdiv);

        const coldiv0 = window.DOMJSOBJ.newElement('div');
        rowdiv.append(coldiv0);

        const coldiv1 = window.DOMJSOBJ.newElement('div');
        rowdiv.append(coldiv1);

        const coldiv2 = window.DOMJSOBJ.newElement('div');
        rowdiv.append(coldiv2);

        const newinput = window.DOMJSOBJ.newElement('input', 'type', 'button', 'id', `domjsDialogAttributeAddButton`, 'value', '속성추가');
        newinput.addEventListener('click', function() {
            this.parentElement.parentElement.parentElement.newAttrRow();
        })
        coldiv2.append(newinput);

        const buttondiv = window.DOMJSOBJ.newElement('div', 'id', 'domjsDialogButtons');
        rootdiv.append(buttondiv);

        const okbutton = window.DOMJSOBJ.newElement('input', 'type', 'button', 'id', 'domjsDialogOkButton', 'value', 'SAVE');
        okbutton.addEventListener('click', () => this.closeModal(true));
        buttondiv.append(okbutton);

        const cancelbutton = window.DOMJSOBJ.newElement('input', 'type', 'button', 'id', 'domjsDialogCancelButton', 'value', 'CANCEL');
        cancelbutton.addEventListener('click', () => this.closeModal(false));
        buttondiv.append(cancelbutton);

        document.querySelector('body').append(dialog);
        dialog.showModal();
    }
    this.closeModal = function(payload) {
        if( payload ) {
            const rowdivs = this.dialog.querySelectorAll('.rowdiv');
            console.log(rowdivs);
        }
        this.dialog?.close();
        delete this.dialog;
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
document.querySelector('#domjson').value = JSON.stringify(domconfig, null, 4);
