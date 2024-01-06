// const moo = require('moo');
// const markedDirective = require('marked-directive');
// import moo from 'https://cdn.jsdelivr.net/npm/moo@0.5.2/moo.min.js';
// import { createDirectives } from 'https://cdn.jsdelivr.net/npm/marked-directive@1.0.4/dist/index.umd.min.js';

setLoadComplete(function() {
    // const descriptionList = {
    //     name: 'descriptionList',
    //     level: 'block',                                     // Is this a block-level or inline-level tokenizer?
    //     start(src) { return src.match(/:[^:\n]/)?.index; }, // Hint to Marked.js to stop and check for a match
    //     tokenizer(src, tokens) {
    //         const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/;    // Regex for the complete token, anchor to string start
    //         const match = rule.exec(src);
    //         console.log(src);
    //         console.log(match);
    //         if (match) {
    //             const token = {                                 // Token to generate
    //                 type: 'descriptionList',                      // Should match "name" above
    //                 raw: match[0],                                // Text to consume from the source
    //                 text: match[0].trim(),                        // Additional custom properties
    //                 tokens: []                                    // Array where child inline tokens will be generated
    //             };
    //             this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
    //             return token;
    //         }
    //     },
    //     renderer(token) {
    //         return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
    //     }
    // };

    // const description = {
    //     name: 'description',
    //     level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
    //     start(src) { return src.match(/:/)?.index; },    // Hint to Marked.js to stop and check for a match
    //     tokenizer(src, tokens) {
    //         const rule = /^:([^:\n]+):([^:\n]*)(?:\n|$)/;  // Regex for the complete token, anchor to string start
    //         const match = rule.exec(src);
    //         // console.log(src);
    //         // console.log(match);
    //         if (match) {
    //             return {                                         // Token to generate
    //                 type: 'description',                           // Should match "name" above
    //                 raw: match[0],                                 // Text to consume from the source
    //                 dt: this.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
    //                 dd: this.lexer.inlineTokens(match[2].trim())   //   any further-nested inline tokens
    //             };
    //         }
    //     },
    //     renderer(token) {
    //         return `\n<dt>${this.parser.parseInline(token.dt)}</dt><dd>${this.parser.parseInline(token.dd)}</dd>`;
    //     },
    //     childTokens: ['dt', 'dd'],                 // Any child tokens to be visited by walkTokens
    // };

    // const youtubeDirective = {
    //     name: 'youtubeDirective',
    //     level: 'block',
    //     start(src){ return src.match(/^:::/)?.index;},
    //     tokenizer(src, tokens) {
    //         console.log(src);
    //         console.log(tokens);
    //         const rule = /^:::([^:\n]+)/;    // Regex for the complete token, anchor to string start
    //         const match = rule.exec(src);
    //         console.log(match);
    //         if (match) {
    //             return {                                         // Token to generate
    //                 type: 'youtubeDirective',                           // Should match "name" above
    //                 raw: match[0],                                 // Text to consume from the source
    //                 dt: this.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
    //                 dd: this.lexer.inlineTokens(match[2].trim())   //   any further-nested inline tokens
    //             };
    //         }
    //     },
    //     renderer(token) {
    //         console.log(token);
    //         if (token.meta.name === 'youtube') {
    //             return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${
    //             token.attrs?.vid || ''
    //             }" title="${
    //             token.text
    //             }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    //         }
    //         return false
    //     }
    // };

    function walkTokens(token) {                        // Post-processing on the completed token tree
        // if (token.type === 'strong') {
        //     token.text += ' walked';
        //     token.tokens = this.Lexer.lexInline(token.text)
        // }
        if (token.type === 'description') {
            token.depth += 1;
        }
    }
    // marked.use({ gfm: true, breaks: true, extensions: [descriptionList, description, markedDirective.createDirectives], walkTokens });
    marked.use(markedDirective.createDirectives());
    marked.use({ breaks: true });
    // marked.use({ breaks: true, extensions: [descriptionList, description], walkTokens });

    fetch('/article_1.md').then(res => {
        if( res.ok ) {
            res.text().then(d => {
                document.getElementById('content').innerHTML = DOMPurify.sanitize(marked.parse(d));
            });
        }
    });
});
