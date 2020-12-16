//TODO: "Activate concentration for ..." [x] form
//TODO: "Proper rounds handling"
//TODO: "End of their next turn" and "End of caster's next turn"

const setTimerX = async function(actor, effectTitle, relativeTo) {
	let effect = await actor.effects.find(ef => ef.data.label === effectTitle);
	if (!effect) {
		ui.notifications.error("Something went wrong! Effect was not found on the token.");
		return;
	}
	let currentRound = game.combat.current.round;
	let currentTurn = game.combat.current.turn;
	effect.update({duration : {
		rounds: 10, 
		turns: 1,
		startTurn: relativeTo, 
		startRound : relativeTo <= currentTurn ? currentRound : currentRound - 1 }
	});
}

const setTimerEndOfTurn = async function(actor, effectTitle, relativeTo) {
	let effect = await actor.effects.find(ef => ef.data.label === effectTitle);
	if (!effect) {
		ui.notifications.error("Something went wrong! Effect was not found on the token.");
		return;
	}
	let currentRound = game.combat.current.round;
	let currentTurn = game.combat.current.turn;
	effect.update({duration : {
		turns: game.combat.turns.length+1,
		rounds: 0,
		startTurn: currentTurn, 
		startRound : relativeTo <= currentTurn ? currentRound : currentRound - 1 }

	});
}


const popDialog = function(event, actor){

	if (!game.combat) {
		ui.notifications.warn("Status effect timer module can only be used in combat. This is a subject to change.");
		return;
	}

	let fighterOptions = game.combat.turns
		.map((fighter, turn) => `<option value="${turn}"><img src=${fighter.img}>  ${fighter.name} </option>`)
		.join(``);

	$(function() {
		var defaultSelected = game.combat.turn;
		$("#relativeToSelector").val(defaultSelected);
	});
	let cont = `Relative to <select name="relativeToSelector" id="relativeToSelector">${fighterOptions}</select>'s turn:`;

	new Dialog({
		title: "Select duration",
		content: cont,
		buttons: {
			a: {
				label: "End of next turn",
				callback: (html) => {
					setTimerEndOfTurn(actor, event.currentTarget.title, document.getElementById("relativeToSelector").value);
				},
			},
			b: {
				label: "10 rounds",
				callback: (html) => {
					setTimerX(actor, event.currentTarget.title, document.getElementById("relativeToSelector").value);
				},
			}
		},
		default: "a",
	}).render(true)
}

Hooks.on("ready", function() {
	let originalToggle = TokenHUD.prototype._onToggleEffect;
	TokenHUD.prototype._onToggleEffect = (function(event, {overlay=false}={}) {
		originalToggle.bind(this);
		if (event.shiftKey) {
			popDialog(event,this.object.actor);
		}
		return originalToggle.bind(this)(event, {overlay=false}={});
	});
});

const removeFinishedEffects = async function() {
	game.combat.turns.forEach(
		fighter => fighter.actor.effects
			.filter(e => e.duration.remaining != null && e.duration.remaining <= 0)
			.forEach(async (e) => {e.delete()})
	);
}


let lastTurnProcessed = -1;
Hooks.on("getCombatTrackerEntryContext", () => {
		if (lastTurnProcessed != game.combat.turn) {
			lastTurnProcessed = game.combat.turn;
			removeFinishedEffects();
		}
	}
);
