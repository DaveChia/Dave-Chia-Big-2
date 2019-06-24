//This script houses the functions needed to initate the game namely:
//resetAllCardsArray : creates a deck of standard 52 cards poker deck
//shuffleCards : shuffles the created poker deck randomly
//distributeCards : distributes the shuffled deck to all 4 players in clockwise direction
//playerFormCombos : form combos after all players recieve all cards








function resetAllCardsArray () {
	
	allCardsArray = [];
	
	for (let x = 1 ; x <= 13 ; x ++ ) {
		
		let textChar = x;
		
		if( x === 1 ){
			
			textChar = "A";
			textRank = 2;
			
		}else if( x === 2 ){
			
			textRank = 1;
			
		}else if( x === 3 ){
			
			textRank = 13;
			
		}else if( x === 4 ){
			
			textRank = 12;
			
		}else if( x === 5 ){
			
			textRank = 11;
			
		}else if( x === 6 ){
			
			textRank = 10;
			
		}else if( x === 7 ){
			
			textRank = 9;
			
		}else if( x === 8 ){
			
			textRank = 8;
			
		}else if( x === 9 ){
			
			textRank = 7;
			
		}else if( x === 10 ){
			
			textRank = 6;
			
		}else if( x === 11 ){
			
			textChar = "J";
			textRank = 5;
			
		}else if( x === 12 ){
			
			textChar = "Q";
			textRank = 4;
			
		}else if( x === 13 ){
			
			textChar = "K";
			textRank = 3;
			
		}
		
		let card1 = {
			
			text : textChar,
			suit : "diamond",
			textRank : textRank,
			suitRank : 4
		}
		let card2 = {
			
			text : textChar,
			suit : "club",
			textRank : textRank,
			suitRank : 3
		}
		let card3 = {
			
			text : textChar,
			suit : "heart",
			textRank : textRank,
			suitRank : 2
		}
		let card4 = {
			
			text : textChar,
			suit : "spade",
			textRank : textRank,
			suitRank : 1
		}
		
		allCardsArray.push(card1,card2,card3,card4);
		
	}
	
}

function shuffleCards(){
	
	var currentIndex = allCardsArray.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = allCardsArray[currentIndex];
			allCardsArray[currentIndex] = allCardsArray[randomIndex];
			allCardsArray[randomIndex] = temporaryValue;
			
		}

}

function distributeCards(){
	
	let ai1Container = document.getElementById("ai1container");
	let ai2Container = document.getElementById("ai2container");
	let ai3Container = document.getElementById("ai3container");
	let userContainer = document.getElementById("userContainer");
	
	ai1Container.innerHTML = "";
	ai2Container.innerHTML = "";
	ai3Container.innerHTML = "";
	userContainer.innerHTML = "";
	
	//Distribute deck to all players
	for(let i = 0; i < allCardsArray.length; i+=4){
		
		AI1CardArray.push(allCardsArray[i]);
		
		AI2CardArray.push(allCardsArray[i+1]);
		
		AI3CardArray.push(allCardsArray[i+2]);
		
		userCardArray.push(allCardsArray[i+3]);
		
	}
	
	playerFormCombos(userCardArray);
	setCardsHTML(userContainer,userCardArray,"userCardContainer");

	playerFormCombos(AI1CardArray);
	setCardsHTML(ai1Container,AI1CardArray,"cardContainer");

	playerFormCombos(AI2CardArray);
	setCardsHTML(ai2Container,AI2CardArray,"cardContainer");

	playerFormCombos(AI3CardArray);
	setCardsHTML(ai3Container,AI3CardArray,"cardContainer");

	function setCardsHTML(inputContainer,inputArray,type){
		
		for(let i = 0; i < inputArray.length; i++){
		
			let userDiv = document.createElement("DIV");
			if(i===0){
			
				userDiv.classList.add("userCardContainer1");
				
			
			}
			if(type==="userCardContainer"){
				userDiv.classList.add("userCards");
				userDiv.dataset.textRank = inputArray[i].textRank;
				userDiv.dataset.suitRank = inputArray[i].suitRank;
			
				let inputFirstClassChar;
				
				if(inputArray[i].text === 2){
				
					inputFirstClassChar = "two";
				
				}else if(inputArray[i].text === 3){
				
					inputFirstClassChar = "three";
				
				}else if(inputArray[i].text === 4){
				
					inputFirstClassChar = "four";
				
				}else if(inputArray[i].text === 5){
				
					inputFirstClassChar = "five";
				
				}else if(inputArray[i].text === 6){
				
					inputFirstClassChar = "six";
				
				}else if(inputArray[i].text === 7){
				
					inputFirstClassChar = "seven";
				
				}else if(inputArray[i].text === 8){
				
					inputFirstClassChar = "eight";
				
				}else if(inputArray[i].text === 9){
				
					inputFirstClassChar = "nine";
				
				}else if(inputArray[i].text === 10){
				
					inputFirstClassChar = "ten";
				
				}else{
				
					inputFirstClassChar = inputArray[i].text;
				
				}
				
				userDiv.classList.add(inputFirstClassChar + inputArray[i].suit);
			
			}/*else{
				
				userDiv.innerHTML =  inputArray[i]["text"] + "  " + inputArray[i]["suit"];
				
			}*/
			userDiv.classList.add(type);
			userDiv.dataset.text = inputArray[i]["text"];
			userDiv.dataset.suit = inputArray[i]["suit"];
			
			inputContainer.appendChild(userDiv); 
			
		}
		
	}
	
}

function playerFormCombos(inputPlayerArray){
	
	//sort the ai/human cards in ascending order
	inputPlayerArray.sort( compare );
	
	//runs function to check whether player has any sets of royal flush 
	//(Work in Progress!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)
	checkRoyalFlush();
	
	//runs function to check whether player has any sets of doubles/triples/four cards, each card can only have 1 of each attribute, which means AI will prioritise four of the same cards -> triples -> doubles when playing
	checkFourOfaKindAndDoubleAndTriple();
	
	//runs function to check whether player has any sets of flush
	checkFlush();
	
	

	function checkFlush(){
		
		let specimenArray = ["diamond","club","heart","spade"];
		
		for (let i = 0 ; i < specimenArray.length; i++){
			
			let flushCounter = 0;
			
			//Checks how many same suits per suit the player has
			for (let x = 0 ; x < inputPlayerArray.length; x++){
				
				if(specimenArray[i] === inputPlayerArray[x].suit){
					
					flushCounter++;
					
				}
				//If the player has 5 cards of the same suit, add comboflush attribute to these cards
				if(flushCounter === 5){
					
					for (let j = 0 ; j < inputPlayerArray.length; j++){
						
						if(specimenArray[i] === inputPlayerArray[j].suit){
							
							inputPlayerArray[j].comboFlush = "yes";
							
						}
						
					}
					
					break;
					
				}
				
			}
			
		}
		
	}
	
	function checkFourOfaKindAndDoubleAndTriple(){
		
		let specimenArray = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
		let fourOfaKindTotalSets = 0;
		let breakChecker = 0;
		
		for (let i = 0 ; i < specimenArray.length; i++){
			
			let fourOfaKindCounter = 0;
			
			for (let x = 0 ; x < inputPlayerArray.length; x++){
				
				if(specimenArray[i] == inputPlayerArray[x].text){
					
					fourOfaKindCounter++;
					
				}
				//Checks for four of the same number only
				if(fourOfaKindCounter == 4 && x == inputPlayerArray.length-1){
					
					for (let j = 0 ; j < inputPlayerArray.length; j++){
					
						if(specimenArray[i] == inputPlayerArray[j].text){
							
							inputPlayerArray[j].comboFourOfaKind = "yes";
					
						}
						
					}
				//Checks for three of the same number only
				}else if(fourOfaKindCounter == 3 && x == inputPlayerArray.length-1){
					
					for (let j = 0 ; j < inputPlayerArray.length; j++){
					
						if(specimenArray[i] == inputPlayerArray[j].text){
							
							inputPlayerArray[j].comboTriple = "yes";
					
						}
						
					}
				//Checks for two of the same number only	
				}else if(fourOfaKindCounter == 2 && x == inputPlayerArray.length-1){
					
					for (let j = 0 ; j < inputPlayerArray.length; j++){
						
						if(specimenArray[i] == inputPlayerArray[j].text){
							
							inputPlayerArray[j].comboDouble = "yes";
					
						}
						
					}
					
				} 
				
			}
			//Finds how many sets of 4 same cards the user has
			if(fourOfaKindCounter === 4){
				
				fourOfaKindTotalSets++;
				
			}
			
		}
		//If there are 4 of the same card, find the smallest card that does not have any attributes to be the 4 of a kind 5th card.
		for(let k = 0 ; k < fourOfaKindTotalSets; k++){
			
			for(let x = 0 ; x < inputPlayerArray.length; x++){
			
				if(typeof inputPlayerArray[x].comboFourOfaKind === 'undefined' && typeof inputPlayerArray[x].comboTriple === 'undefined' && typeof inputPlayerArray[x].comboDouble === 'undefined' && typeof inputPlayerArray[x].comboRoyalFlush === 'undefined'){
					
					inputPlayerArray[x].comboFourOfaKind = "yes";
					break;
				}
				
			}
			
		}	
		
	}
	//This function checks whether the player has more than 5 of the same suit
	function checkRoyalFlush(){
		
		let diamondSuit = "diamond";
		let diamondCount = inputPlayerArray.filter((obj) => obj.suit === diamondSuit).length;

		let clubSuit = "club";
		let clubCount = inputPlayerArray.filter((obj) => obj.suit === clubSuit).length;

		let heartSuit = "heart";
		let heartCount = inputPlayerArray.filter((obj) => obj.suit === heartSuit).length;

		let spadeSuit = "spade";
		let spadeCount = inputPlayerArray.filter((obj) => obj.suit === spadeSuit).length;

		if(diamondCount >= 5){
			
			checkRoyalFlushExists(inputPlayerArray,diamondSuit);
			
		}else if(clubSuit >= 5){
			
			checkRoyalFlushExists(inputPlayerArray,clubSuit);
			
		}else if(heartSuit >= 5){
			
			checkRoyalFlushExists(inputPlayerArray,heartSuit);
			
		}else if(spadeSuit >= 5){
			
			checkRoyalFlushExists(inputPlayerArray,spadeSuit);
			
		}

	}
	//Checks whether royal flush exist
	function checkRoyalFlushExists(inputArray, suit){
		
		let checkBreaker;
		
		for(let x = 0; x < inputArray.length ; x++){
			let royalFlushChecker = 0;
			if(inputArray[x].suit === "diamond" && inputArray[x].text === 3){
				
				continue;
				
			}
			
			if(x > checkBreaker){
				
				checkBreaker == -1;
				
			}
			
			if(x <= checkBreaker){
				
				continue;
				
			}
			
			if(inputArray[x+4]){
				
				for (let i = 0 ; i < 5 ; i++){
				
					if(inputArray[x+i] && inputArray[x+i+1]){
						
						
						if((inputArray[x+i].suit === inputArray[x+1+i].suit) && (inputArray[x+i].textRank === inputArray[x+1+i].textRank+1)){
							
							royalFlushChecker++;
					
						}else{
							
							break;
							
						}
						
					}
					
					if(royalFlushChecker === 4){
				
						inputArray[x+0].comboRoyalFlush = "yes";
						inputArray[x+1].comboRoyalFlush = "yes";
						inputArray[x+2].comboRoyalFlush = "yes";
						inputArray[x+3].comboRoyalFlush = "yes";
						inputArray[x+4].comboRoyalFlush = "yes";
				
						royalFlushChecker = 0;
						checkBreaker = x + 4;
					
					}
					
				}
				
			}
			
		}
		
	}
	
}

