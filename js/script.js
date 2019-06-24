//This is the main script that runs the Big2 Game

//Initialize of global variables
let allCardsArray = [];//Array to hold all 52 poker cards
let userCardArray = [];//Array to hold human player's cards
let AI1CardArray = [];//Array to hold AI1's cards
let AI2CardArray = [];//Array to hold AI2's cards
let AI3CardArray = [];//Array to hold AI3's cards
let controlPlayer;//variable to hold current player
let currentMode;//variable to hold human player playing now or ai playing now
let cardsUserChose = [];// array to hold cards human player chose for next play
let cardPlayed = document.getElementById("cardPlayedContainer");//Center container to house the current cards in play
let passReset = "no";
let firstStartCheck = "yes";//Check whether diamond 3 first played has been played
let controlPassDetails = {//Object to hold passing details
	
	originalControlPlayer : "nil",
	passCount : 0
	
}
let currentCard = [{//Array to hold current cards in play, to start game with diamond 3
	
	text: 3, 
	suit: "diamond", 
	textRank: 13, 
	suitRank: 4

}];

	//Runs function to initalize game, found in initialize.js
	resetAllCardsArray ();
	shuffleCards();
	distributeCards();








