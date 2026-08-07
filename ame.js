// event generation code - sync with other files.
// YES i KNOW i should externalise this to a common file but i can't figure out how to get it to link on the web host i'm using

// pseudorandom number generator
function Pseudorand(seed){
	let a = 167; // a and c NEED to be PRIME
	let c = 251;

	return (a * seed + c);
}


const eventCount = 5;
const AmeEvent = Object.freeze({
	STRESS 	: 0,
	GAME 	: 1,
	PHONE	: 2,
	VIDEO	: 3,
	GOOUT	: 4,
});

let lastPseudorandomNumber = 0;

function GetCurrentEvent(){
	lastPseudorandomNumber = Math.floor(Date.now() / eventInterval);
	lastPseudorandomNumber = Pseudorand(lastPseudorandomNumber);
	return lastPseudorandomNumber % eventCount;
}

function GetCurrentEventModifier(){
	lastPseudorandomNumber = Pseudorand(lastPseudorandomNumber);
	return lastPseudorandomNumber;
}

const eventInterval = 756227; // 12 and a bit minutes, prime number
//const eventInterval = 1000; // for testing













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
	"idle/"	, // this is for go out, which shouldn't display anything. it's a fallback.
];

const ame_event_spritesets = [ // make sure this lines up with AmeEvent
	ame_stress0_sprites	, // this shouldn't be used, but it's here in case of failure
	ame_game_sprites	,
	ame_phone_sprites	,
	ame_video_sprites	,
	ame_stress0_sprites	, // this is for go out, which shouldn't display anything. it's a fallback.
];


const audio_click = new Audio("assets/audio/pop_tooltip.wav");


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

const EventWindowTitles = [
	"webcam",
	"playing a game",
	"browsing tweeter",
	"watching metube",
	"went out..."
];

// wait for stuff to load
window.addEventListener('load', function () {
	// grab references
	const ame 			= document.getElementById("ame");
	const windowTitle	= document.getElementById("windowTitle");
	const background 	= document.getElementById("background");

	// call main
	setInterval(main, 500)
})


function main(){

	// check for pet sprite changes
	if((petTimestamp != 0) && (petTimestamp + petDuration < Date.now())){
		ame.setAttribute("src", currentSpritesetPath + currentSpriteset[affection]);
		petTimestamp = 0;
	}
	
	
	if((Date.now() - lastCheck) < eventInterval) return;
	lastCheck = Date.now();

	currentEvent = GetCurrentEvent();
	windowTitle.innerText = EventWindowTitles[currentEvent];
	currentSpritesetPath = assetPathAme + assetPathsEvent[currentEvent];

	// ame spriteset switch
	ame.style.visibility = "visible";
	switch(currentEvent){
		case AmeEvent.STRESS:
			stress = GetCurrentEventModifier() % 2;
			currentSpriteset = ame_stress_spritesets[stress];
			break;

		case AmeEvent.GOOUT:
			ame.style.visibility = "hidden";
			currentSpriteset = ame_event_spritesets[currentEvent];
			break;

		default:
			currentSpriteset = ame_event_spritesets[currentEvent];
			break;

	}

	// background switch
	switch(currentEvent){
		case AmeEvent.VIDEO:
		case AmeEvent.GOOUT:
			background.style.opacity = 0.5;
			break;

		default:
			background.style.opacity = 1.0;
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