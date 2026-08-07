// event generation code - sync with other files.
// YES i KNOW i should externalise this to a common file but i can't figure out how to get it to link on the web host i'm using

// pseudorandom number generator
function Pseudorand(seed){
	let a = 676493; // a and c NEED to be PRIME
	let c = 251;

	return (a * seed + c);
}


const eventCount = 5;
const AmeEvent = Object.freeze({
	STRESS 	: 0,
	GAME 	: 1,
	PHONE	: 2,
	VIDEO	: 3,
	VIDEO	: 4,
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
	"outside"	,
];




// wait for stuff to load
window.addEventListener('load', function () {
	// grab references
	const windowTitle	= document.getElementById("windowTitle");
	const background 	= document.getElementById("background");

	// call main
	setInterval(main, 500)
})

let lastCheck = 0;

function main(){
	
	if((Date.now() - lastCheck) < eventInterval) return;
	lastCheck = Date.now();

	currentEvent = GetCurrentEvent();
	windowTitle.innerText = EventWindowTitles[currentEvent];

	switch(currentEvent){
		default:
			break;
	};

}