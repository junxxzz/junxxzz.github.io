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
            contents: `<b>te<i>st</i></b><br>aaaaaaaaa<br>cccccccccccc`,
        },
    ],
}];
const dom1 = new DOMJS(domconfig);
dom1.attach(document.querySelector('#container'));
document.querySelector('#domjson').value = JSON.stringify(domconfig, null, 4);
