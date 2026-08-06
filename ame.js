// pseudorandom number generator
function Pseudorand(seed, max){
	let a = 2142423;
	let c = 12345;

	return (a * seed + c) % max;
}

const eventCount = 3;
const AmeEvent = Object.freeze({
	STRESS 	: 0,
	GAME 	: 1,
	PHONE	: 2
});

// asset path stuff
const assetPathAme 		= "assets/ame/";
const assetPathIdle		= "idle/";
const assetPathGame 	= "game/";
const assetPathPhone 	= "phone/";

// i know i shouldn't be hardcoding these but i'm LAZY
const ame_stress0_sprites = [
	"Ame_idle_S0-A0-D0.gif",
	"Ame_idle_S0-A1-D0.gif",
	"Ame_idle_S0-A2-D0.gif",
];

const ame_stress1_sprites = [
	"Ame_idle_S1-A0-D0.gif",
	"Ame_idle_S1-A1-D0.gif",
	"Ame_idle_S1-A2-D0.gif",
];

const ame_game_sprites = [
	"Ame_game_S0-A0-D0.gif",
	"Ame_game_S0-A1-D0.gif",
	"Ame_game_S0-A2-D0.gif"
];

const ame_phone_sprites = [
	"Ame_phone_S0-A0-D0.gif",
	"Ame_phone_S0-A1-D0.gif",
	"Ame_phone_S0-A2-D0.gif"
];


const ame_stress_spritesets = [
	ame_stress0_sprites,
	ame_stress1_sprites
];


const audio_click = new Audio("assets/audio/pop_tooltip.wav");


// event timing
let lastCheck = 0;
const eventInterval = 1140230; // 17 and a bit minutes
const affectionChance = 10;

let petTimestamp = 0;
const petDuration = 500; 

// ame's status
let currentEvent = AmeEvent.STRESS;
let stress = 0;
let affection = 0;

// asset paths for things we're currently using
let currentSpriteset = [];
let currentSpritesetPath = "";

// wait for stuff to load
window.addEventListener('load', function () {
	// grab references
	const ame 			= document.getElementById("ame");
	const background 	= document.getElementById("background");

	// call main
	setInterval(main, 100)
})


function main(){

	// check for pet sprite changes
	if((petTimestamp != 0) && (petTimestamp + petDuration < Date.now())){
		ame.setAttribute("src", currentSpritesetPath + currentSpriteset[affection]);
		petTimestamp = 0;
	}
	
	
	if((Date.now() - lastCheck) < eventInterval) return;
	lastCheck = Date.now();

	let pseudorandomSeed = Date.now() % eventInterval;
	currentEvent = Pseudorand(pseudorandomSeed, eventCount);

	switch(currentEvent){
		case AmeEvent.STRESS:
			stress = Pseudorand(Pseudorand(pseudorandomSeed, 235514), 2);
			currentSpritesetPath = assetPathAme + assetPathIdle;
			currentSpriteset = ame_stress_spritesets[stress];
			break;

		case AmeEvent.GAME:
			currentSpritesetPath = assetPathAme + assetPathGame;
			currentSpriteset = ame_game_sprites;
			break;

		case AmeEvent.PHONE:
			currentSpritesetPath = assetPathAme + assetPathPhone;
			currentSpriteset = ame_phone_sprites;
			break;

	}
	
	// reset affection
	affection = 0;

	// set new sprite
	ame.setAttribute("src", currentSpritesetPath + currentSpriteset[affection]);

}

function AmeClicked(){
	audio_click.currentTime = 0;
	audio_click.play();

	if((Math.random() * affectionChance) < 1) affection = 1;
	if((currentEvent == AmeEvent.STRESS) && (stress > 0)){
		if((Math.random() * affectionChance) < 1){
			stress = stress - 1;
			currentSpriteset = ame_stress_spritesets[stress];
		}
	}

	ame.setAttribute("src", currentSpritesetPath + currentSpriteset[affection + 1]);
	petTimestamp = Date.now();
}