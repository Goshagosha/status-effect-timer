const tmp_d = function(message) {
	console.log("Status effect timer | " + message)
}

const placeholder = function(context) {
	alert("place is held!");
}

class ExtHud extends TokenHUD {
	activateListeners(html) {
		super.activateListeners(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", this.placeholder.bind(this));
	}
}

Hooks.on("ready", function() {
	tmp_d("Hook activated");
	TokenHUD = ExtHud;
});