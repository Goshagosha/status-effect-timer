const tmp_d = function(message) {
	console.log("Status effect timer | " + message)
}

const placeholder = function(context) {
	alert("place is held!");
}

const CustomActivateListeners = function(html) {
	TokenHUD.prototype.activateListeners(html);
	html.find(".status-effects")
		.on("dblclick", ".effect-control", this.placeholder.bind(this));
}

Hooks.on("ready", function() {
	tmp_d("Hook activated");
	TokenHUD.prototype.activateListeners = CustomActivateListeners;
});