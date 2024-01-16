window.alert = function () {};
window.confirm = function () {};
window.addEventListener("load", (event) => {
    renderingIncludePath();
});

function renderingIncludePath() {
    document.querySelectorAll("[data-include-path]").forEach(async (el) => {
        const d = await fetch(el.dataset.includePath);
        if (!d.ok) return;
        const t = await d.text();
        try {
            el.outerHTML = t;
        } catch (error) {
            console.log(error);
        }
        setTimeout(function () {
            if (document.querySelectorAll("[data-include-path]").length) {
                renderingIncludePath();
            }
            else {
                if (window.renderingComplete) {
                    window.renderingComplete(el.dataset.includePath);
                }
            }
        }, 100);
    });
}

function renderingComplete(includePath) {
    // console.log(includePath);
    window.alert = function (arg) {
        if (!window.alertStreams) {
            window.alertStreams = [];
        }
        window.alertStreams.push({type:'alert',args:arguments});
    };
    window.confirm = function (arg) {
        if (!window.alertStreams) {
            window.alertStreams = [];
        }
        window.alertStreams.push({type:'confirm',args:arguments});
    };
    window.renderingComplete = null;
    triggerLoadComplete();
}
window.setInterval(function() {
    if( (typeof window.isLiveAlert)=='undefined' ) {
        window.isLiveAlert = 0;
    }
    if( (typeof window.isOkConfirm)=='undefined' ) {
        window.isOkConfirm = 0;
    }
    if( window.alertStreams && window.alertStreams.length > 0 && window.isLiveAlert==0 ) {
        const alertStream = window.alertStreams.shift();
        if( alertStream.type=='alert' ) {
            if (alertStream.args.length == 2 && (typeof alertStream.args[1]) == 'function') {
                window.closeAlertFunction = alertStream.args[1];
            }
            const al = document.querySelector('#alert');
            al.querySelector('fieldset#alertMessage').innerHTML = alertStream.args[0];
            al.showModal();
            al.addEventListener('close', function() {
                if (window.closeAlertFunction) {
                    window.closeAlertFunction();
                }
                window.closeAlertFunction = null;
                window.isLiveAlert = 0;
            });
        }
        else if( alertStream.type=='confirm' ) {
            if (alertStream.args.length > 1 && (typeof alertStream.args[1]) == 'function') {
                window.okConfirmFunction = alertStream.args[1];
            }
            if (alertStream.args.length > 1 && (typeof alertStream.args[2]) == 'function') {
                window.noConfirmFunction = alertStream.args[2];
            }
            window.isOkConfirm = 0;
            const al = document.querySelector('#confirm');
            al.querySelector('fieldset#confirmMessage').innerHTML = alertStream.args[0];
            al.showModal();
            al.addEventListener('close', function() {
                if( window.isOkConfirm && window.okConfirmFunction ) {
                    window.okConfirmFunction();
                }
                if (!window.isOkConfirm && window.noConfirmFunction) {
                    window.noConfirmFunction();
                }
                window.okConfirmFunction = null;
                window.noConfirmFunction = null;
                window.isOkConfirm = 0;
                window.isLiveAlert = 0;
            });
        }
        window.isLiveAlert = 1;
    }
}, 10);
function closeAlert() {
    document.querySelector('#alert').close();
}
function okConfirm() {
    window.isOkConfirm = 1;
    document.querySelector('#confirm').close();
}
function closeConfirm() {
    document.querySelector('#confirm').close();
}

function setLoadComplete(fn) {
    if (!window.loadCompleteFunctions) {
        window.loadCompleteFunctions = [];
    }
    window.loadCompleteFunctions.push(fn);
}

function triggerLoadComplete() {
    if( window.loadCompleteFunctions && window.loadCompleteFunctions.length ) {
        window.loadCompleteFunctions.forEach(fn => fn());
    }
}

function showLoading() {
    document.querySelector('#circle').showModal();
}

function hideLoading() {
    document.querySelector('#circle').close();
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


function checkHash(fn) {
	if( location.hash ) {
        try {
            window.hash = JSON.parse(decodeURIComponent(location.hash.substring(1)));
            if( fn ) {
                fn(window.hash);
            }
        } catch (error) {
        }
	}
}
function listenHash(fn) {
    checkHash(fn);
	window.addEventListener('hashchange', function() {
		checkHash(fn);
	});
}
window.hash = {};
function setHash(nm, value) {
	window.hash[nm] = value;
	location.hash = `#${encodeURIComponent(JSON.stringify(window.hash))}`;
}

function listenColorScheme(fn) {
    fn(window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark':'light');
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        fn(event.matches? 'dark':'light');
    });
}