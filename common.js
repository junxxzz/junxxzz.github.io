window.alert = function () {};
window.addEventListener("load", (event) => {
    renderingIncludePath();
});

function renderingIncludePath() {
    document.querySelectorAll("[data-include-path]").forEach((el) => {
        fetch(el.dataset.includePath).then((d) => {
            if (!d.ok) return;
            d.text().then((t) => {
                el.outerHTML = t;
                if (window.renderingComplete) {
                    window.renderingComplete(el.dataset.includePath);
                }
            });
        });
    });
    setTimeout(function () {
        if (document.querySelectorAll("[data-include-path]").length) {
            renderingIncludePath();
        }
    }, 100);
}

function renderingComplete(includePath) {
    if (includePath == 'footer.htm') {
        window.alert = function (arg) {
            if (arguments.length == 2 && (typeof arguments[1]) == 'function') {
                window.closeAlertFunction = arguments[1];
            }
            const al = document.querySelector('#alert');
            al.querySelector('fieldset#alertMessage').innerHTML = arguments[0];
            al.showModal();
        };
        triggerLoadComplete();
    }
}

function setLoadComplete(fn) {
    if (!window.loadCompleteFunctions) {
        window.loadCompleteFunctions = [];
    }
    window.loadCompleteFunctions.push(fn);
}

function triggerLoadComplete() {
    window.loadCompleteFunctions.forEach(fn => fn());
}

function showLoading() {
    document.querySelector('#circle').showModal();
}

function hideLoading() {
    document.querySelector('#circle').close();
}

function closeAlert() {
    document.querySelector('#alert').close();
    if (window.closeAlertFunction) {
        window.closeAlertFunction();
        window.closeAlertFunction = null;
    }
}

function humanByte(arg) {
    const unitArr = ['', 'K', 'M', 'G', 'T'];
    let idx = 0;
    while (arg > 1024) {
        arg = arg / 1024;
        idx++;
    }
    return `${Number(arg).toFixed(2)}${unitArr[idx]}Byte`;
}