window.alert = function(){};
window.addEventListener("load", (event) => {
	renderingIncludePath();
});

function renderingIncludePath() {
	document.querySelectorAll("[data-include-path]").forEach((el) => {
		fetch(el.dataset.includePath).then((d) => {
			if( !d.ok ) return;
			d.text().then((t) => {
				el.outerHTML = t;
				if( window.renderingComplete ) {
					window.renderingComplete(el.dataset.includePath);
				}
			});
		});
	});
	setTimeout(function() {
		if( document.querySelectorAll("[data-include-path]").length ) {
			renderingIncludePath();
		}
	}, 100);
}
function renderingComplete(includePath) {
	if( includePath=='footer.htm' ) {
		window.alert = function(arg) {
			if( arguments.length==2 && (typeof arguments[1])=='function' ) {
				window.closeAlertFunction = arguments[1];
			}
			const al = document.querySelector('#alert');
			al.querySelector('fieldset#alertMessage').innerHTML = arguments[0];
			al.showModal();
		}
	}
}