let mytemplate = `
    {{name}}:
    {{age age}}
    <br>
`;

Handlebars.registerHelper('age', function (age) {
    // return new Handlebars.SafeString(`<b>${Handlebars.escapeExpression(age)}</b>`)
    if( Number(age) > 20 ) {
        return new Handlebars.SafeString(`<b>${age}</b>`)
    }
    else {
        return age;
    }
})