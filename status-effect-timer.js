const setTimer = function(e, t) {
	let currentRound = game.combat.current.round;
	e.update({duration : {rounds : t, startRound : currentRound}});
}

let hasJustClicked = false;

const popDialog = async function(event, actor){

	let effectTitle = event.currentTarget.title;	
	let effect = await actor.effects.find(ef => ef.data.label === effectTitle);

	if (!effect) {
		ui.notifications.error("Something went wrong! Effect was not found on the token.");
		return;
	}
	if (!game.combat) {
		ui.notifications.warn("Status effect timer module can only be used in combat. This is a subject to change.");
		return;
	}

	new Dialog({
		title: "Select duration (in rounds)",
		buttons: {
			one: {
				label: "One",
				callback: (html) => {
					setTimer(effect, 2);
				}
			},
			ten: {
				label: "Ten",
				callback: (html) => {
					setTimer(effect, 10);
				}
			},
			hundred: {
				label: "Hundred",
				callback: (html) => {
					setTimer(effect, 100);
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
			return originalToggle.bind(this)(event, {overlay=false}={});
		}
	});
	let originalActivateListeners = TokenHUD.prototype.activateListeners;
	TokenHUD.prototype.activateListeners = (function(html) {
		originalActivateListeners.bind(this)(html);
		html.find(".status-effects")
			.on("dblclick", ".effect-control", event => popDialog(event, this.object.actor));
	});
});
