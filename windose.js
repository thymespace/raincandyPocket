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



const EventWindowTitles = [
	"jine"		,
	"esteem"	,
	"tweeter"	,
	"metube"	,
	"train"		,
];

const GameAnimationPaths = [
	"assets/games/rabbitandsteel.gif",
	"assets/games/deadlock.gif",
	"assets/games/bombrush.gif"
];

const VideoAnimationPaths = [
	"assets/videos/helpmemaketoys.gif",
	"assets/videos/cat.gif",
	"assets/videos/limb.gif",
	"assets/videos/room67.gif",
	"assets/videos/requiem.gif",
	"assets/videos/yuyu.gif",
];

let eventWindows = [];


// wait for stuff to load
window.addEventListener('load', function () {
	// grab references
	const windowTitle	= document.getElementById("windowTitle");
	const background 	= document.getElementById("background");

	eventWindows	= [
		document.getElementById("jine"		),
		document.getElementById("esteem"	),
		document.getElementById("tweeter"	),
		document.getElementById("metube"	),
		document.getElementById("outside"	),
	];

	const odekakeMountain 	= document.getElementById("odekakeMountain");
	const odekakeTown	 	= document.getElementById("odekakeTown");
	const odekakeGround 	= document.getElementById("odekakeGround");
	const odekakeTrain 		= document.getElementById("odekakeTrain");
	const odekakeFence		= document.getElementById("odekakeFence");
	const odekakePole		= document.getElementById("odekakePole");

	// call main
	setInterval(main, 500)
})

let lastCheck = 0;

function main(){
	
	if((Date.now() - lastCheck) < eventInterval) return;
	lastCheck = Date.now();

	currentEvent = GetCurrentEvent();
	windowTitle.innerText = EventWindowTitles[currentEvent];

	// show correct window
	for(let i = 0; i < eventCount; i++){
		if(i == currentEvent) 
			eventWindows[i].style.visibility = "visible";
		else
			eventWindows[i].style.visibility = "collapse";
	}

	switch(currentEvent){
		case AmeEvent.STRESS:
			background.src = "assets/backgrounds/Bg_jine.png";
			break;

		case AmeEvent.GOOUT:

			// set background based on real time
			let currentHour = (new Date()).getHours();
			const TimeRange = Object.freeze({
				LateNight 	: 0,
				Night 		: 1,
				DawnDusk	: 2,
				Day			: 3
			});
			let currentTimeRange = -1;

			// no i don't care that a long if else chain is atrocious i'm lazy and this only runs once every like few minutes
			if 		(currentHour < 4 ) 	currentTimeRange = TimeRange.LateNight	;
			else if	(currentHour < 5 ) 	currentTimeRange = TimeRange.Night		;
			else if	(currentHour < 7 ) 	currentTimeRange = TimeRange.DawnDusk	;
			else if	(currentHour < 18)	currentTimeRange = TimeRange.Day		;
			else if	(currentHour < 19)	currentTimeRange = TimeRange.DawnDusk	;
			else if (currentHour < 23)	currentTimeRange = TimeRange.Night		;
			else						currentTimeRange = TimeRange.LateNight	;

			switch(currentTimeRange){
				case TimeRange.LateNight:
					background		.src = "assets/odekake/odekake_bg.png";
					odekakeMountain	.src = "assets/odekake/odekake_bg_mountain_22862.png";
					odekakeTown		.src = "assets/odekake/odekake_bg_town_40430.png"
					odekakeGround	.src = "assets/odekake/odekake_ground.png";
					odekakeTrain	.src = "assets/odekake/odekake_train_002.gif";
					odekakeFence	.src = "assets/odekake/odekake_fence_37309.png";
					odekakePole		.src = "assets/odekake/odekake_pole_29804.png"
					break;

				case TimeRange.Night:
					background		.src = "assets/odekake/odekake_bg_40992.png";
					odekakeMountain	.src = "assets/odekake/odekake_bg_mountain_22862.png";
					odekakeTown		.src = "assets/odekake/odekake_bg_town_40430.png"
					odekakeGround	.src = "assets/odekake/odekake_ground.png";
					odekakeTrain	.src = "assets/odekake/odekake_train_002.gif";
					odekakeFence	.src = "assets/odekake/odekake_fence_37309.png";
					odekakePole		.src = "assets/odekake/odekake_pole_29804.png"
					break;

				case TimeRange.DawnDusk:
					background		.src = "assets/odekake/odekake_bg_25279.png";
					odekakeMountain	.src = "assets/odekake/odekake_bg_mountain.png";
					odekakeTown		.src = "assets/odekake/odekake_bg_town.png"
					odekakeGround	.src = "assets/odekake/odekake_ground_25826.png";
					odekakeTrain	.src = "assets/odekake/odekake_train_001.gif";
					odekakeFence	.src = "assets/odekake/odekake_fence_40791.png";
					odekakePole		.src = "assets/odekake/odekake_pole.png"
					break;

				case TimeRange.Day:
					background		.src = "assets/odekake/odekake_bg_23154.png";
					odekakeMountain	.src = "assets/odekake/odekake_bg_mountain_48253.png";
					odekakeTown		.src = "assets/odekake/odekake_bg_town_47862.png"
					odekakeGround	.src = "assets/odekake/odekake_ground_46213.png";
					odekakeTrain	.src = "assets/odekake/odekake_train_000.gif";
					odekakeFence	.src = "assets/odekake/odekake_fence.png";
					odekakePole		.src = "assets/odekake/odekake_pole_37989.png"
					break;
			}


			break;

		case AmeEvent.GAME:
			background.src = GameAnimationPaths[GetCurrentEventModifier()  % GameAnimationPaths.length];
			break;

		case AmeEvent.VIDEO:
			background.src = VideoAnimationPaths[GetCurrentEventModifier()  % VideoAnimationPaths.length];
			break;

		default:
			break;
	};

}