window.alert = function () {};
window.confirm = function () {};
window.addEventListener("load", (event) => {
    renderingIncludePath();
});

function renderingIncludePath() {
    document.querySelectorAll("[data-include-path]").forEach((el) => {
        fetch(el.dataset.includePath).then((d) => {
            if (!d.ok) return;
            d.text().then((t) => {
                try {
                    el.outerHTML = t;
                    if (window.renderingComplete) {
                        window.renderingComplete(el.dataset.includePath);
                    }
                } catch (error) {
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
        triggerLoadComplete();
    }
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
    console.log(location.hash);
    if( location.hash.match(/^#state=pass-through-value/) ) {
        var fragmentString = location.hash.substring(1);
        var params = {};
        var regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        console.log(Object.keys(params));
        if (Object.keys(params).length > 0) {
            console.log(params['state']);
            localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
            if (params['state'] && params['state'] == 'pass-through-value') {
                var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
                if (params && params['access_token']) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET',
                        'https://www.googleapis.com/auth/userinfo.email&' +
                        'access_token=' + params['access_token']);
                    xhr.onreadystatechange = function (e) {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            console.log(xhr.response);
                        } else if (xhr.readyState === 4 && xhr.status === 401) {
                            // Token invalid, so prompt for user permission.
                            oauth2SignIn();
                        }
                    };
                    xhr.send(null);
                } else {
                    oauth2SignIn();
                }
            }
        }
    }
	if( location.hash ) {
		window.hash = JSON.parse(decodeURIComponent(location.hash.substring(1)));
        if( fn ) {
            fn(window.hash);
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