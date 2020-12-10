const setTimer = function(t) {
	console.log(t);
}

let hasJustClicked = false;

const popDialog = function(event){

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
	let originalToggle = TokenHUD.prototype._onToggleEffect;
	TokenHUD.prototype._onToggleEffect = (function(event, {overlay=false}={}) {
		setTimeout(function(){ 
			hasJustClicked = false;
		}, 300);
		if (!hasJustClicked) {
			hasJustClicked = true;
			return originalToggle(event, {overlay=false}={});
		}
	});
	let originalActivateListeners = TokenHUD.prototype.activateListeners;
	TokenHUD.prototype.activateListeners = (function(html) {
		originalActivateListeners.bind(this)(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", event => popDialog(event));
	});
});
