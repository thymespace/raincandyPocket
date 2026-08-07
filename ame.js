
// asset path stuff
const assetPathAme 		= "assets/ame/";

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

const ame_video_sprites = [
	"Ame_video_S0-A0-D0.gif",
	"Ame_video_S0-A1-D0.gif",
	"Ame_video_S0-A2-D0.gif"
];


const ame_stress_spritesets = [
	ame_stress0_sprites,
	ame_stress1_sprites
];

const assetPathsEvent	= [ // make sure this lines up with AmeEvent
	"idle/"	,
	"game/"	,
	"phone/",
	"video/",
];

const ame_event_spritesets = [ // make sure this lines up with AmeEvent
	ame_stress0_sprites	, // this shouldn't be used, but it's here in case of failure
	ame_game_sprites	,
	ame_phone_sprites	,
	ame_video_sprites	,
];


const audio_click = new Audio("assets/audio/pop_tooltip.wav");


// event timing
let lastCheck = 0;
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

	let pseudorandomSeed = Math.floor(Date.now() / eventInterval);
	currentEvent = GetCurrentEvent();
	currentSpritesetPath = assetPathAme + assetPathsEvent[currentEvent];

	switch(currentEvent){
		case AmeEvent.STRESS:
			stress = GetCurrentEventModifier() % 2;
			currentSpriteset = ame_stress_spritesets[stress];
			console.log(stress);
			break;

		default:
			currentSpriteset = ame_event_spritesets[currentEvent];
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