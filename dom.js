/**
 * checkbox 객체를 만들어서 리턴한다.
 * @param { value: string, name: string, checked: boolean, disabled: boolean, groupname: string, idx: string, click: function, } } attrs
 */
function newRadio(attrs) {
    const span = document.createElement('span');
    span.className = 'radiogroup';
    const radio = document.createElement('input');
    span.append(radio);
    radio.setAttribute('type', 'radio');
    radio.setAttribute('id', `${attrs.groupname}_${attrs.idx??attrs.value}`);
    radio.setAttribute('name', `${attrs.groupname}[]`);
    radio.setAttribute('value', attrs.value);
    if (attrs.checked) {
        radio.setAttribute('checked', true);
    }
    if (attrs.disabled) {
        radio.setAttribute('disabled', true);
    }
    radio.addEventListener('click', attrs.click);
    const label = document.createElement('label');
    label.setAttribute('for', `${attrs.groupname}_${attrs.idx??attrs.value}`);
    label.innerHTML = attrs.name;
    span.append(label);
    return span;
}
/**
 * radio group 객체를 만들어서 리턴한다.
 * @param { {id: string, name: string, classname: string, params: {any}, options: [{value: string, name: string, checked: boolean}], change: function, } } attrs
 */
function newRadioGroup(attrs) {
    const div = document.createElement('div');
    const simpleattrs = ['id', 'name'];
    simpleattrs.forEach(s => {
        if (attrs[s]) {
            div.setAttribute(s, attrs[s]);
        }
    });
    if (attrs.classname) {
        div.className = attrs.classname;
    }
    if (attrs.params && typeof attrs.params == 'object') {
        for (const k in attrs.params) {
            div.setAttribute(`data-param-${k}`, attrs.params[k]);
        }
    }
    if (attrs.options && attrs.options.forEach) {
        var nowvalues = [];
        attrs.options.forEach(o => {
            o.groupname = attrs.name;
            if (o.checked) {
                nowvalues.push(o.value);
            }
            o.click = function () {
                const groupdiv = this.parentNode.parentNode;
                const radios = groupdiv.querySelectorAll('input[type="radio"]');
                if (radios && radios.length) {
                    var newvalues = [];
                    radios.forEach(radio => {
                        if (radio.checked) {
                            newvalues.push(radio.value);
                        }
                    });
                    const oldvalues = JSON.parse(groupdiv.getAttribute('nowvalues'));
                    groupdiv.setAttribute('nowvalues', JSON.stringify(newvalues));
                    if (oldvalues != newvalues) {
                        attrs.change(newvalues);
                    }
                }
            }
            const radio = newRadio(o);
            div.append(radio);
        });
        div.setAttribute('nowvalues', JSON.stringify(nowvalues));
    }
    return div;
}
/**
 * checkbox 객체를 만들어서 리턴한다.
 * @param { value: string, name: string, checked: boolean, disabled: boolean, groupname: string, idx: string, click: function, } } attrs
 */
function newCheckbox(attrs) {
    const span = document.createElement('span');
    span.className = 'checkboxgroup';
    const checkbox = document.createElement('input');
    span.append(checkbox);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `${attrs.groupname}_${attrs.idx??attrs.value}`);
    checkbox.setAttribute('name', `${attrs.groupname}[]`);
    checkbox.setAttribute('value', attrs.value);
    if (attrs.checked) {
        checkbox.setAttribute('checked', true);
    }
    if (attrs.disabled) {
        checkbox.setAttribute('disabled', true);
    }
    checkbox.addEventListener('click', attrs.click);
    const label = document.createElement('label');
    label.setAttribute('for', `${attrs.groupname}_${attrs.idx??attrs.value}`);
    label.innerHTML = attrs.name;
    span.append(label);
    return span;
}
/**
 * checkbox group 객체를 만들어서 리턴한다.
 * @param { {id: string, name: string, classname: string, params: {any}, options: [{value: string, name: string, checked: boolean}], change: function, } } attrs
 */
function newCheckboxGroup(attrs) {
    const div = document.createElement('div');
    const simpleattrs = ['id', 'name'];
    simpleattrs.forEach(s => {
        if (attrs[s]) {
            div.setAttribute(s, attrs[s]);
        }
    });
    if (attrs.classname) {
        div.className = attrs.classname;
    }
    if (attrs.params && typeof attrs.params == 'object') {
        for (const k in attrs.params) {
            div.setAttribute(`data-param-${k}`, attrs.params[k]);
        }
    }
    if (attrs.options && attrs.options.forEach) {
        var nowvalues = [];
        attrs.options.forEach(o => {
            o.groupname = attrs.name;
            if (o.checked) {
                nowvalues.push(o.value);
            }
            o.click = function () {
                const groupdiv = this.parentNode.parentNode;
                const checkboxs = groupdiv.querySelectorAll('input[type="checkbox"]');
                if (checkboxs && checkboxs.length) {
                    var newvalues = [];
                    checkboxs.forEach(checkbox => {
                        if (checkbox.checked) {
                            newvalues.push(checkbox.value);
                        }
                    });
                    const oldvalues = JSON.parse(groupdiv.getAttribute('nowvalues'));
                    groupdiv.setAttribute('nowvalues', JSON.stringify(newvalues));
                    if (oldvalues != newvalues) {
                        attrs.change(newvalues);
                    }
                }
            }
            const checkbox = newCheckbox(o);
            div.append(checkbox);
        });
        div.setAttribute('nowvalues', JSON.stringify(nowvalues));
    }
    return div;
}
/**
 * option 객체를 만들어서 리턴한다.
 * @param { {name: string, value: string, selected: boolean} } attrs
 */
function newOption(attrs) {
    const option = document.createElement('option');
    option.value = attrs.value;
    option.text = attrs.name;
    option.selected = attrs.selected;
    return option;
}
/**
 * select box 객체를 만들어서 리턴한다.
 * @param { {id: string, name: string, value: string, classname: string, params: {any}, options: [{value: string, name: string}], change: function, } } attrs
 */
function newSelect(attrs) {
    const select = document.createElement('select');
    const simpleattrs = ['id', 'name'];
    simpleattrs.forEach(s => {
        if (attrs[s]) {
            select.setAttribute(s, attrs[s]);
        }
    });
    if (attrs.classname) {
        select.className = attrs.classname;
    }
    if (attrs.params && typeof attrs.params == 'object') {
        for (const k in attrs.params) {
            select.setAttribute(`data-param-${k}`, attrs.params[k]);
        }
    }
    if (attrs.options && attrs.options.forEach) {
        attrs.options.forEach(o => {
            o.selected = o.value == attrs.value;
            const option = newOption(o);
            select.append(option);
        });
    }
    if (attrs.change) {
        select.addEventListener('change', attrs.change);
    }
    return select;
}
/**
 * 이미지 객체를 만들어서 리턴한다.
 * @param { {src: string|blob, width: number, height: number, id: string, name: string, classname: string, border: number, params: {any}, load: function, click: function, } } attrs
 */
function newImg(attrs) {
    const img = document.createElement("img");
    let useBlob = false;
    if (attrs.src) {
        if ((typeof attrs.src) == 'string') {
            img.setAttribute("src", attrs.src);
        } else {
            const url = window.URL.createObjectURL(attrs.src);
            img.setAttribute("src", url);
            useBlob = true;
        }
    }
    attrs.border = attrs.border?? 0;
    const simpleattrs = ['border', 'width', 'height', 'id', 'name'];
    simpleattrs.forEach(s => {
        if (attrs[s]) {
            img.setAttribute(s, attrs[s]);
        }
    });
    if (attrs.classname) {
        img.className = attrs.classname;
    }
    if (attrs.params && typeof attrs.params == 'object') {
        for (const k in attrs.params) {
            img.setAttribute(`data-param-${k}`, attrs.params[k]);
        }
    }
    if (useBlob) {
        img.addEventListener('load', function () {
            window.URL.revokeObjectURL(this.src);
        });
    }
    if (attrs.load) {
        img.addEventListener('load', attrs.load);
    }
    if (attrs.click) {
        img.addEventListener('click', attrs.click);
    }
    return img;
}