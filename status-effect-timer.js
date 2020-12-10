const d = function(message) {
	console.log("Status effect timer | " + message)
}

const timerSelection = function(context) {
	alert("HELLO WORLD!");
}

class ExtHud extends TokenHUD {
	activateListeners(html) {
		super.activateListeners(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", this.timerSelection.bind(this));
	}
}

Hooks.on("ready", function() {
	d("Hook activated");
	TokenHUD = ExtHud;
});