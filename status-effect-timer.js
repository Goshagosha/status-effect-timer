require(TokenHUD);

const Simple5econs = (() => {

	const timerSelection = function(context) {
		alert("HELLO WORLD!");
	}


	const overrideOnClickListener = function(html) {
		TokenHUD.activateListeners(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", timerSelection.bind(this));
	};
	
  // HOOKS  
  Hooks.on("ready", function() {
		TokenHUD.activateListeners = overrideOnClickListener;
  });
})();
