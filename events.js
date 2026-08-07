// pseudorandom number generator
function Pseudorand(seed){
	let a = 676493; // a and c NEED to be PRIME
	let c = 251;

	return (a * seed + c);
}

const eventCount = 4;
const AmeEvent = Object.freeze({
	STRESS 	: 0,
	GAME 	: 1,
	PHONE	: 2,
	VIDEO	: 3
});

const eventInterval = 756;//227; // 12 and a bit minutes, prime number

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