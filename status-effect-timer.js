const setTimer = function(t) {
	console.log(t);
}

const popDialog = function(){

	new Dialog({
		title: "Select duration (in rounds)",
		buttons: {
			one: {
				label: "One",
				callback: (html) => {
					setTimer(2);
				}
			},
			ten: {
				label: "Ten",
				callback: (html) => {
					setTimer(10);
				}
			},
			hundred: {
				label: "Hundred",
				callback: (html) => {
					setTimer(100);
				}
			}
		},
		default: "one"    
	}).render(true)
}

Hooks.on("ready", function() {
	let originalOnClick = TokenHUD.prototype._onClickStatusEffects;
	TokenHUD.prototype._onClickStatusEffects = (function(event) {
		if (event.originalEvent.detail < 2) {
			originalOnClick.bind(this)(event);
		}
	});
	let originalActivateListeners = TokenHUD.prototype.activateListeners;
	TokenHUD.prototype.activateListeners = (function(html) {
		originalActivateListeners.bind(this)(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", popDialog.bind(this));
	});
});
