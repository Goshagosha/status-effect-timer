const SimpleStatusIcons = (() => {
	const defineStatusIcons = function(data) {
		window.CONFIG.statusEffects = [
			{
			    label: "Blinded", 
			    id: "blinded", 
			    icon: "modules/simple-status-icons/icons/blinded.svg",
			},
			{
			    label: "Charmed",
			    id: "charmed",
			    icon: "modules/simple-status-icons/icons/charmed.svg", 
			},
			{
			    label:  "Concentrating",
			    id:  "concentrating",
			    icon: "modules/simple-status-icons/icons/concentrating.svg",
			},
			{
			    label:  "Deafened", 
			    id:  "deafened", 
			    icon: "modules/simple-status-icons/icons/deafened.svg", 
			},
			{
			    label: "Exhaustion 1",
			    id: "exhaustion 1",
			    icon:"modules/simple-status-icons/icons/exhaustion1.svg",
			},
			{
			    label: "Exhaustion 2",
			    id: "exhaustion 2",
			    icon:"modules/simple-status-icons/icons/exhaustion2.svg",
			},
			{
			    label: "Exhaustion 3",
			    id: "exhaustion 3",
			    icon:"modules/simple-status-icons/icons/exhaustion3.svg",
			},
			{
			    label: "Exhaustion 4",
			    id: "exhaustion 4",
			    icon:"modules/simple-status-icons/icons/exhaustion4.svg",
			},
			{
			    label: "Exhaustion 5",
			    id: "exhaustion 5",
			    icon:"modules/simple-status-icons/icons/exhaustion5.svg",
			},
			{
			    label: "Frightened",
			    id: "frightened",
			    icon:"modules/simple-status-icons/icons/frightened.svg",
			},
			{
			    label: "Grappled",
			    id: "grappled",
			    icon:"modules/simple-status-icons/icons/grappled.svg",
			},
			{
			    label: "Incapacitated",
			    id: "incapacitated",
			    icon:"modules/simple-status-icons/icons/incapacitated.svg",
			},
			{
			    label: "Inspiration",
			    id: "inspiration",
			    icon:"modules/simple-status-icons/icons/inspiration.svg",
			},
			{
			    label: "Invisible",
			    id: "invisible",
			    icon:"modules/simple-status-icons/icons/invisible.svg",
			},
			{
			    label: "Paralyzed",
			    id: "paralyzed",
			    icon:"modules/simple-status-icons/icons/paralyzed.svg",
			},
			{
			    label: "Petrified",
			    id: "petrified",
			    icon:"modules/simple-status-icons/icons/petrified.svg",
			},
			{
			    label: "Poisoned",
			    id: "poisoned",
			    icon:"modules/simple-status-icons/icons/poisoned.svg",
			},
			{
			    label: "Prone",
			    id: "prone",
			    icon:"modules/simple-status-icons/icons/prone.svg",
			},
			{
			    label: "Restrained",
			    id: "restrained",
			    icon:"modules/simple-status-icons/icons/restrained.svg",
			},
			{
			    label: "Stunned",
			    id: "stunned",
			    icon:"modules/simple-status-icons/icons/stunned.svg",
			},
			{
			    label: "Unconscious",
			    id: "unconscious",
			    icon:"icons/svg/unconscious.svg",
			},
			{
			    label: "Injured",
			    id: "injured",
			    icon:"icons/svg/blood.svg",
			},
			{
			    label: "Dead",
			    id: "dead",
			    icon:"icons/svg/skull.svg",
			},
			{
			    id: "aid",
			    label: "Aid",
			    icon:"systems/dnd5e/icons/spells/heal-sky-1.jpg",
			},
			{
			    id: "bless",
			    label: "Bless",
			    icon:"systems/dnd5e/icons/spells/haste-sky-1.jpg",
			},
			{
			    label: "Bardic inspiration",
			    id: "bardic inspiration",
			    icon:"systems/dnd5e/icons/spells/evil-eye-red-1.jpg",
			}
		]
	};
	
  // HOOKS  
  Hooks.once("ready", function() {
		defineStatusIcons();
  });
})();
