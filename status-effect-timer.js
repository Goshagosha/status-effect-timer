const placeholder = function(context) {
	alert("place is held!");
}

const CustomActivateListeners = function(html) {
	TokenHUD.prototype.activateListeners(html);
	//html.find(".status-effects")
	//	.on("dblclick", ".effect-control", this.placeholder.bind(this));
}

Hooks.on("ready", function() {
	let og = TokenHUD.prototype.activateListeners;
	TokenHUD.prototype.activateListeners = (function(html) {
		console.log("Status effect timer | " + "Trying to load HUD");
		og(html);
		/* do shit with html */
		console.log("Status effect timer | " + "Loaded HUD");
	});
});