MODULE_ID='status-effect-timer';


const setTimer = function(e, t) {
	let currentRound = game.combat.current.round;
	let currentTurn = game.combat.current.turn;
	switch(t) {
		case "0-eon":
			e.update({duration : {
				turns: game.combat.turns.length,
				rounds: 0,
				startTurn: currentTurn, 
				startRound : currentRound}
			});
			break;
		case "0-10":
			e.update({duration : {
				rounds: 10, 
				startTurn: currentTurn, 
				startRound : currentRound}
			});
			break;
	}
}


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
		title: "Select duration",
		buttons: {
			a: {
				label: "End of next turn",
				callback: (html) => {
					setTimer(effect, "0-eon");
				},
			},
			b: {
				label: "10 rounds",
				callback: (html) => {
					setTimer(effect, "0-10");
				},
			}
		},
		default: "a",
	}).render(true)
}


let hasJustClicked = false;

Hooks.on("ready", function() {
	libWrapper.register(MODULE_ID, 'TokenHUD.prototype._onToggleEffect', function(_onToggleEffect, ...args) {
		setTimeout(function(){ 
			hasJustClicked = false;
		}, 300);
		if (!hasJustClicked) {
			hasJustClicked = true;
		} else {
			return;
		}
		return _onToggleEffect.apply(this, args);
	});
});

Hooks.on("ready", function() {
	let ogAL = TokenHUD.prototype.activateListeners;
	libWrapper.register(MODULE_ID, 'TokenHUD.prototype.activateListeners', function(activateListeners, ...args) {
		let html = $(args[1]);
		var mytimeout;
		ogAL.bind(this)(html);
		/*
		html.find(".effects > img").hover(() => {
			mytimeout = setTimeout(function(){
			//			this._onClickStatusEffects.bind(this)
					}, 500);
				}, () => {
					clearTimeout(mytimeout);
				});
		*/
		html.find(".status-effects")
			.on("dblclick", ".effect-control", event => popDialog(event, this.object.actor));
		return activateListeners.apply(this, args);
	});
});

const removeFinishedEffects = async function() {
	let participants = await game.combat.turns.length;
	let currentTurn = await game.combat.turn;
	let prevFid = (participants+currentTurn-1)%participants;
	let actor = await game.combat.turns[prevFid].actor;	
	actor.effects.filter(e => e.duration.remaining != null && e.duration.remaining <= 0).forEach(async (e) => {e.delete()});
}


let lastTurnProcessed = -1;

Hooks.on("getCombatTrackerEntryContext", () => {
		if (lastTurnProcessed != game.combat.turn) {
			lastTurnProcessed = game.combat.turn;
			removeFinishedEffects();
		}
	}
);
