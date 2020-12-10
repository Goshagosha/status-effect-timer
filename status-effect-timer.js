const tmp_d = function(message) {
	console.log("Status effect timer | " + message)
}

const placeholder = function(context) {
	alert("place is held!");
}

const CustomActivateListeners = function(html) {
	tmp_d("Trying to load HUD");
	TokenHUD.prototype.activateListeners(html);
	tmp_d("Loaded HUD");
	//html.find(".status-effects")
	//	.on("dblclick", ".effect-control", this.placeholder.bind(this));
}

Hooks.on("ready", function() {
	tmp_d("Hook activated");
	TokenHUD.prototype.activateListeners = CustomActivateListeners;
});