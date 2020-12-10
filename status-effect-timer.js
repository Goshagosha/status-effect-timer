require(TokenHUD);

const d = function(message) {
	console.log("Status effect timer | " + message)
}

const timerSelection = function(context) {
	alert("HELLO WORLD!");
}


const overrideOnClickListener = function(html) {
	d("overide working");
	TokenHUD.activateListeners(html);
	html.find(".status-effects")
		.on("dblclick", ".effect-control", timerSelection.bind(this));
};

// HOOKS  
Hooks.on("ready", function() {
	d("Hook activated");
	TokenHUD.activateListeners = overrideOnClickListener;
});