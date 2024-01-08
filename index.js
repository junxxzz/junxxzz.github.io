const {markedHighlight} = globalThis.markedHighlight;
marked.use(markedDirective.createDirectives());
// marked.use(markedLinkifyIt({},{}));
marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            const addon = `<div class='language'>${language}</div>`;
            return hljs.highlight(code, {
                language
            }).value + addon;
        },
    }),
);
marked.use({breaks: true});

setLoadComplete(function () {
    document.querySelector('#userlogin').addEventListener('click', oauthSignIn);
    document.querySelector('#userlogout').addEventListener('click', revokeAccess);
    console.log(hash);

    listenHash(loadArticle);

    const articleTemplate = document.querySelector("template#articleTemplate").innerHTML;
    const articleSection = document.querySelector("section#articles");
    let maArticleIdx = 0;
    fetch("/articles.dat").then((res) => {
        if (res.ok) {
            res.text().then((d) => {
                d.split("\n").reverse().forEach((line) => {
                    if (!line.trim()) {
                        return;
                    }
                    const [idx, writeAt, categorys, title] = line.split("|");
                    if (maArticleIdx == 0) {
                        maArticleIdx = idx;
                    }
                    const newArticle = document.createElement("article");
                    newArticle.setAttribute("id", `article-${idx}`);
                    newArticle.innerHTML = articleTemplate
                        .replace("{article-writeAt}", writeAt)
                        .replace("{article-title}", title);
                    categorys.split(",").forEach((c) => {
                        const newIcon = document.createElement("img");
                        newIcon.setAttribute("src", `/icons/${c.trim()}.svg`);
                        newIcon.classList.add("articleIcon");
                        newArticle.innerHTML = newArticle.innerHTML.replace(
                            "{article-icons}",
                            newIcon.outerHTML,
                        );
                    });
                    newArticle.addEventListener("click", () => {
                        setHash("articleId", idx);
                    });
                    articleSection.append(newArticle);
                });
                if (!window.hash.articleId) {
                    window.hash.articleId = maArticleIdx;
                    loadArticle(window.hash);
                }
            });
        }
    });
});

function loadArticle(hash) {
    console.log(hash);
    if (hash.articleId > 0) {
        fetch(`/articles/article_${hash.articleId}.md`).then((res) => {
            if (res.ok) {
                res.text().then((d) => {
                    document.getElementById("contents").innerHTML = DOMPurify.sanitize(
                        marked.parse(d),
                    );
                    window.scrollTo(0, 0);
                    gtag("event", "article_view", {
                        articleId: hash.articleId,
                        result: "success",
                    });
                });
            } else {
                gtag("event", "article_view", {
                    articleId: hash.articleId,
                    result: "fail",
                });
            }
        });
    }
}

/**
 * Create form to request access token from Google's OAuth 2.0 server.
 **/
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        client_id: "920653369919-738ci7p79n38kvc9lv25ndfdvijm1kao.apps.googleusercontent.com",
        redirect_uri: "https://junxxzz.github.io",
        response_type: "token",
        scope: "email profile",
        include_granted_scopes: "true",
        state: "pass-through-value",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}
function revokeAccess(accessToken) {
    // Google's OAuth 2.0 endpoint for revoking access tokens.
    var revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke';

    // Create <form> element to use to POST data to the OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', revokeTokenEndpoint);

    // Add access token to the form so it is set as value of 'token' parameter.
    // This corresponds to the sample curl request, where the URL is:
    //      https://oauth2.googleapis.com/revoke?token={token}
    var tokenField = document.createElement('input');
    tokenField.setAttribute('type', 'hidden');
    tokenField.setAttribute('name', 'token');
    tokenField.setAttribute('value', accessToken);
    form.appendChild(tokenField);

    // Add form to page and submit it to actually revoke the token.
    document.body.appendChild(form);
    form.submit();
}