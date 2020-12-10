const setTimer = function(t) {
    alert("chosen");
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
	let og = TokenHUD.prototype.activateListeners;
	TokenHUD.prototype.activateListeners = (function(html) {
		console.log("Status effect timer | " + "Trying to load HUD");
		og.bind(this)(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", placeholder.bind(this));

		console.log("Status effect timer | " + "Loaded HUD");
	});
});
