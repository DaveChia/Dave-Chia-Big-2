//This script houses codes for AI to play the game with the following functions
//The code will check current player and lock in that player's current cards array as currentCardArray



function AIPutCard(){
	
	let currentCardArray = [];
	let tempCardArray = [];
	let currentPlayCard;
	
	//Checks current player and lock in that user's cards array
	if(controlPlayer === "AI1"){
		
		currentCardArray = AI1CardArray;
		
	}else if(controlPlayer === "AI2"){
		
		currentCardArray = AI2CardArray;
		
	}else if(controlPlayer === "AI3"){
		
		currentCardArray = AI3CardArray;
		
	}else if(controlPlayer === "user"){
		
		currentCardArray = userCardArray;
	
	}
	
	//Set temp array to the currentcard array for temporary comparison
	for (let z = 0 ; z < currentCardArray.length; z++){
		
		tempCardArray.push(currentCardArray[z]);
		
	}
	
	//Checks current in play card array length
	if(currentCard.length === 1 || currentCard.length === 0){
		
		//If there is only 1 card in the current play cards
		if(currentCard.length === 1){
		
			currentPlayCard = findCurrentPlayerSmallestCard();//This function finds the smallest card in the player's array
			
			if(currentPlayCard.text === 3 && currentPlayCard.suit==="diamond"){//If player's smallest card is diamond 3, start firstStart function to start the first round of game
			
				firstStart();
				moveToNextPlayer();//Function to progress the game to the next player without passing
				
			}else{
			
				//If player's smallest card is not diamond 3, find the smallest card in the player's hand that is bigger than the current card in play
				for(let k = 0 ; k < 12 ; k++){
					
					let checkPass = "no";
					let checkResult = checkCurrentPlayCardBiggerThanCurrentCard();//Function to check current player playing card is bigger than the current card in play
			
					//if checkResult is true and the selected card does not belong to any combo,play this card and move to next player, else check for next smallest single card that fulfils the condition until theres no more card to play, then the AI will pass
					if(checkResult === "checkOK" && typeof currentCard[0].comboFourOfaKind === 'undefined' && typeof currentCard[0].comboTriple === 'undefined' && typeof currentCard[0].comboDouble === 'undefined' && typeof currentCard[0].comboRoyalFlush === 'undefined' ){
					
						moveToNextPlayer();
						break;
						
					}else{
						
						for (let i = 0 ; i < tempCardArray.length; i++){
				
							if(currentPlayCard["text"] === tempCardArray[i]["text"] && currentPlayCard["suit"] === tempCardArray[i]["suit"]){
								
								tempCardArray.splice(i, 1);
								
								if(tempCardArray.length>=1){
									
									currentPlayCard = findCurrentPlayerSmallestCard();//Finds the next smallest card if the previous card does not match the conditions
									
								}else{
									
									currentPlayerPass();//Function for AI to pass turn
									checkPass = "yes";
									break;
									
								}
								
								
								break;
								
							}
							
						}
				
					}
					
					if(checkPass === "yes"){//Stop the for loop check if single card conditions is fulfilled
						
					
						break;
					
					}
					
				}
				
			}
		
		}else if(currentCard.length === 0){//If there is no cards in play, which means that all 3 previous player passed, AI can put any cards by function controlRestartPlay, then progress to next player
		
			controlRestartPlay();//Function for AI to put any cards
			moveToNextPlayer();//Progress to next player
			
		}
		
		
	}else{//Run here if current cards in play is in 5/3/2 cards combinations
	
		let checkComboExist = 0;
		
		if(currentCard.length == 5){//If current cards in play has 5 cards
			
			//Below codes check for whether combinations exist
			let checkCurrentCardRoyalFlush=0;
			let checkCurrentCardFlush=0;
			let checkCurrentCardFourKind=0;
			let checkCurrentCardTriple=0;
			let checkCurrentCardDouble=0;
	
			let checkCurrentCardRoyalFlushExist="no";
			let checkCurrentCardFlushExist="no";
			let checkCurrentCardFourKindExist="no";
			let checkCurrentCardThreeKindExist="no";
			let checkCurrentCardDoubleExist="no";
			
			let checkNextCardRoyalFlush=0;
			let checkNextCardFlush=0;
			let checkNextCardFourKind=0;
			let checkNextCardTriple=0;
			let checkNextCardDouble=0;
			
			let checkNextCardRoyalFlushExist="no";
			let checkNextCardFlushExist="no";
			let checkNextCardFourKindExist="no";
			let checkNextCardThreeKindExist="no";
			let checkNextCardDoubleExist="no";
			
			let tempNextFlushArray = [];
			let tempNextThreeKindArray = [];
			let tempNextFourKindArray = [];
			let tempNextStraightArray = [];
			
			let checkCurrentCardStraightExist = "nil";
			let checkNextCardStraightExist = "nil";
			
			checkCards();

			function checkCards(){

						for(let z = 0 ; z < currentCard.length ; z++){
							
							if(currentCard[z].comboRoyalFlush){
								
								checkCurrentCardRoyalFlush++;
							}
							if(currentCard[z].comboFourOfaKind){
								
								checkCurrentCardFourKind++;
							}
							if(currentCard[z].comboTriple){
								
								checkCurrentCardTriple++;
							}
							if(currentCard[z].comboDouble){
								
								checkCurrentCardDouble++;
							}
							if(currentCard[z].comboFlush){
								
								checkCurrentCardFlush++;
							}
							
						}
						
						if(checkCurrentCardFlush >= 5){
							
							
							checkCurrentCardFlushExist = "yes";
							
						}
						
						if(checkCurrentCardTriple>=3 && checkCurrentCardDouble>=2){
							
							
							checkCurrentCardThreeKindExist = "yes";
							
						}
						
						if(checkCurrentCardFourKind>=4){
							
						
							checkCurrentCardFourKindExist = "yes";
							
						}
						if(checkCurrentCardRoyalFlush>=5){
							
							
							checkCurrentCardRoyalFlushExist = "yes";
							
						}
						
						checkNextPlayerCombo();	
						
							if(checkNextCardFlush >= 5){
							
								
								checkNextCardFlushExist = "yes";
								
							}
							if(checkNextCardTriple>=3 && checkNextCardDouble>=2){
								
								
								checkNextCardThreeKindExist = "yes";
								
							}
							if(checkNextCardFourKind>=4){
								
							
								checkNextCardFourKindExist = "yes";
								
							}
							if(checkNextCardRoyalFlush>=5){
								
							
								checkNextCardRoyalFlushExist = "yes";
								
							}
							
						
				if(checkCurrentCardFlushExist!=="yes" && checkCurrentCardThreeKindExist!=="yes" && checkCurrentCardFourKindExist!=="yes" && checkCurrentCardRoyalFlushExist!=="yes"){
				
					checkCurrentCardStraightExist = "yes";
				
				}else{
					
					checkCurrentCardStraightExist = "no";
					
				}

			}		
			
			//The code belows allows the AI to play combinations with respect to which combination is in the current cards in play, priorty is to play flush -> 3 of a kind -> four of a kind -> royal flush with royal flush to be kept for later  plays by AI
			if(checkCurrentCardFlushExist === "yes"){
				
				checkComboExist = playAfterFlush();
				
			}else if(checkCurrentCardThreeKindExist === "yes"){
			
				checkComboExist = playAfter3ofKind();
			
			}else if(checkCurrentCardFourKindExist === "yes"){
			
				checkComboExist = playAfter4ofKind();
			
			}else if(checkCurrentCardRoyalFlushExist === "yes"){
			
				checkComboExist = playAfterRoyalFlush();
			
			}/*else if(checkCurrentCardStraightExist == "yes"){
			
				playAfterStraight();
			
			}*/
		
			//Below function is still under construction, AI cannot play straight combinations
			/*
			function playAfterStraight(){
		
				if(checkNextCardFlushExist ==="yes" || checkNextCardThreeKindExist ==="yes" || checkNextCardFourKindExist ==="yes" || checkNextCardRoyalFlushExist ==="yes"){
					
					let tempPlayCard = [];
					let checkNextStraightExist;
					let currentCardLastElement = currentCard[0];
		
				
		
					for(let x = 0; x = currentCardArray.length - 1; x++){
							
							if(tempPlayCard.length == 0){
							
								tempPlayCard.push(currentCardArray[x]);
						
							}else if(tempPlayCard.length !== 0){
						
								if(tempPlayCard[tempPlayCard.length-1].textRank - 1 === currentCardArray[x].textRank){
									
									tempPlayCard.push(currentCardArray[x]);
								}
							
							}
							if(tempPlayCard.length === 5){
								
								if(tempPlayCard[4].textRank + 1 === currentCard[4].textRank){
									
									
									
								}else{
									
									tempPlayCard = [];
								}
								
								checkNextStraightExist == "yes";
								break;
							}
							
				}
		
		
				if(checkNextStraightExist ==="yes"){
						
					let doNothing;
				
				}else{
					
					if(checkNextCardThreeKindExist ==="yes"){
					
						for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboTriple){
									
										if(tempPlayCard.length===0){
										
											tempPlayCard.push(currentCardArray[x]);
										
										}else if(tempPlayCard[0].text === currentCardArray[x].text){
										
											tempPlayCard.push(currentCardArray[x]);
										
										}
									
									}
									if(tempPlayCard.length===3){
								
										break;
									
									}
								
						}
						
						for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboDouble){
									
										if(tempPlayCard.length===3){
										
											tempPlayCard.push(currentCardArray[x]);
										
										}else if(tempPlayCard[3].text === currentCardArray[x].text){
										
											tempPlayCard.push(currentCardArray[x]);
										
										}
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
								
						}
					
					}else if(checkNextCardFourKindExist ==="yes"){
							
								for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboFourOfaKind){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
								
								}
								
							
					}else if(checkNextCardRoyalFlushExist ==="yes"){
							
								for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboRoyalFlush){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
							
								}
								
					}
					
					}
		
						if(tempPlayCard.length === 5){
						
							currentCard = [];
							for(let x = 0; x < tempPlayCard.length ; x++){
							
								currentCard.push(tempPlayCard[x]);
							
							}
							
							return 1;
						
						}else{
						
							return 0;
						
						}
		
		
		
		
				}else{
					
					return 0;
					
				}
		
		
			}*/
			
			//Function for AI to play in response to royal flush in play
			function playAfterRoyalFlush(){	
		
				if(checkNextCardRoyalFlushExist ==="yes"){
				
					let tempPlayCard = [];
					let currentRoyalFlushNumber;
					
					for(let x = 0; x < currentCardArray.length; x++){
						
						if(currentCardArray[x].comboRoyalFlush){
							
							tempPlayCard.push(currentCardArray[x]);
							
						}
						if(tempPlayCard.length === 5){
					
							break;
						
						}
						
					}
						if(tempPlayCard.length === 5){
						
							currentCard = [];
							for(let x = 0; x < tempPlayCard.length ; x++){
							
								currentCard.push(tempPlayCard[x]);
							
							}
							
							return 1;
						
						}else{
							
							return 0;
						
						}
					
				}else{
				
					return 0;
				
				}
				
			}
			
			//Function for AI to play in response to four of a kind in play
			function playAfter4ofKind(){	
				
				if(checkNextCardFourKindExist ==="yes" || checkNextCardRoyalFlushExist ==="yes"){
				
					let tempPlayCard = [];
					let currentComboFourNumber;
					
					if(checkNextCardFourKindExist ==="yes"){
					
						for(let x = 0; x < currentCard.length; x++){
						
							if(currentCard[x].comboFourOfaKind){
							
								currentComboFourNumber = currentCard[x].textRank;
								break;
							
							}
						
						}
						for(let x = 0; x < currentCardArray.length; x++){
						
							if(currentCardArray[x].comboFourOfaKind && tempPlayCard.length === 0 && currentCardArray[x].textRank < currentComboFourNumber){
							
								tempPlayCard.push(currentCardArray[x]);
							
							}else if(tempPlayCard[0]){
							
								if(currentCardArray[x].comboFourOfaKind){
							
									tempPlayCard.push(currentCardArray[x]);
									
								}
							
							}
						
							if(tempPlayCard.length==5){
								
								break;
							
							}
						
						}
						
					
						if(tempPlayCard.length === 5){
						
							currentCard = [];
							for(let x = 0; x < tempPlayCard.length ; x++){
							
								currentCard.push(tempPlayCard[x]);
							
							}
							
							return 1;
						
						}else{
							
							return 0;
						
						}
						
					}else{
					
							if(checkNextCardRoyalFlushExist ==="yes"){
							
								for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboRoyalFlush){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
							
								}
								
							}
					
					}
				
				}else{
				
					return 0;
				
				}
				
			}	
				
			//Function for AI to play in response to three of a kind in play
			function playAfter3ofKind(){
			
				if(checkNextCardThreeKindExist ==="yes" || checkNextCardFourKindExist ==="yes" || checkNextCardRoyalFlushExist ==="yes"){
				
					let tempPlayCard = [];
					let currentComboTripleNumber;
				
					if(checkNextCardThreeKindExist ==="yes"){
					
						for(let x = 0; x < currentCard.length; x++){
						
							if(currentCard[x].comboTriple){
								
								currentComboTripleNumber = currentCard[x].textRank;
								break;
							
							}
						
						}
						for(let x = 0; x < currentCardArray.length; x++){
						
							if(currentCardArray[x].comboTriple && tempPlayCard.length === 0 && currentCardArray[x].textRank < currentComboTripleNumber){
							
								tempPlayCard.push(currentCardArray[x]);
							
							}else if(tempPlayCard[0]){
							
								if(currentCardArray[x].comboTriple && currentCardArray[x].textRank === tempPlayCard[0].textRank){
							
									tempPlayCard.push(currentCardArray[x]);
									
								}
							
							}
							
							if(tempPlayCard.length==3){
								
								break;
							
							}
						
						}
						
						for(let x = 0; x < currentCardArray.length; x++){
						
							if(currentCardArray[x].comboDouble && tempPlayCard.length === 3){
							
								tempPlayCard.push(currentCardArray[x]);
							
							}else if(tempPlayCard[3]){
							
								if(currentCardArray[x].comboDouble && currentCardArray[x].textRank === tempPlayCard[3].textRank){
							
									tempPlayCard.push(currentCardArray[x]);
									
								}
							
							}
							
							if(tempPlayCard.length==5){
								
								break;
							
							}
						
						}
						
						if(tempPlayCard.length === 5){
						
							currentCard = [];
							for(let x = 0; x < tempPlayCard.length ; x++){
							
								currentCard.push(tempPlayCard[x]);
							
							}
							
							return 1;
						
						}else{
							
							return 0;
						
						}
					
					}else{
					
							if(checkNextCardFourKindExist ==="yes"){
							
								for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboFourOfaKind){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
								
								}
								
							
							}else if(checkNextCardRoyalFlushExist ==="yes"){
							
								for(let x = 0; x < currentCardArray.length; x++){
							
									if(currentCardArray[x].comboRoyalFlush){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
									if(tempPlayCard.length===5){
								
										break;
									
									}
							
								}
								
							}
					
					}
					
					
				}else{
				
					return 0;
				
				}
				
			}
			
			//Function for AI to play in response to flush in play
			function playAfterFlush(){
				
				if(checkNextCardFlushExist ==="yes" || checkNextCardThreeKindExist ==="yes" || checkNextCardFourKindExist ==="yes" || checkNextCardRoyalFlushExist ==="yes"){
				
					let tempPlayCard = [];
					
					if(checkNextCardFlushExist ==="yes"){
					
						for(let x = 1; x < currentCard.length; x++){
						
							if(currentCard[0].suitRank >= currentCardArray[x].suitRank){
							
								tempPlayCard.push(currentCardArray[x]);
							
							}
							if(tempPlayCard.length===5){
						
								break;
							
							}
						
						}
						
					}else{
					
						
						if(checkNextCardThreeKindExist ==="yes"){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboTriple){
								
									if(tempPlayCard.length===0){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}else if(tempPlayCard[0].text === currentCardArray[x].text){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
								
								}
								if(tempPlayCard.length===3){
							
									break;
								
								}
							
							}
							
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboDouble){
								
									if(tempPlayCard.length===3){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}else if(tempPlayCard[3].text === currentCardArray[x].text){
									
										tempPlayCard.push(currentCardArray[x]);
									
									}
								
								}
								if(tempPlayCard.length===5){
							
									break;
								
								}
							
							}
							
						
						}else if(checkNextCardFourKindExist ==="yes"){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboFourOfaKind){
								
									tempPlayCard.push(currentCardArray[x]);
								
								}
								if(tempPlayCard.length===5){
							
									break;
								
								}
							
							}
							
						
						}else if(checkNextCardRoyalFlushExist ==="yes"){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboRoyalFlush){
								
									tempPlayCard.push(currentCardArray[x]);
								
								}
								if(tempPlayCard.length===5){
							
									break;
								
								}
						
							}
							
						}
					
					}
					
					if(tempPlayCard.length === 5){
					
						currentCard = [];
						for(let x = 0; x < tempPlayCard.length ; x++){
						
							currentCard.push(tempPlayCard[x]);
						
						}
						
						return 1;
					
					}else{
					
						return 0;
					
					}
					
				}else{
				
					return 0;
				
				}
			
			}
		
			//The code below check what combo is in AI's hand
			function checkNextPlayerCombo(){
			
				for(let z = 0 ; z < currentCardArray.length ; z++){
					
					if(currentCardArray[z].comboRoyalFlush){
						
						checkNextCardRoyalFlush++;
					}
					if(currentCardArray[z].comboFourOfaKind){
						
						checkNextCardFourKind++;
					}
					if(currentCardArray[z].comboTriple){
						
						checkNextCardTriple++;
					}
					if(currentCardArray[z].comboDouble){
						
						checkNextCardDouble++;
					}
					if(currentCardArray[z].comboFlush){
						
						checkNextCardFlush++;
					}
					
				}
			
			}	
		
		}else if(currentCard.length === 3){//AI will run in response to 3 cards in play
			
			checkComboExist = checkTriple(currentCard);
			
		}else if(currentCard.length === 2){//AI will run in response to 2 cards in play
			
			checkComboExist = checkDouble(currentCard);
			
		}
		
		//checkComboExist is a checker to check whether AI can respond to the current play, if not AI will pass. All functions above will return checkComboSuit, return 1 if AI can play, -1 if no combi can be found
		if(checkComboExist >= 1){
			
			moveToNextPlayer();
			
		}else{
			
			currentPlayerPass();
			
		}
		
		//The code below allows AI to play in response to triple cards in play
		function checkTriple(inputCurrentCard){
			
			let playTripleCard = [];
			for(let x = 0; x < currentCardArray.length ; x++){
				
				if(currentCardArray[x].comboTriple=="yes"){
					
					if(currentCardArray[x].textRank < inputCurrentCard[0].textRank){
						
						if(playTripleCard.length===0 || playTripleCard[0].text===currentCardArray[x].text){
						
							playTripleCard.push(currentCardArray[x]);
							
						}
						
					}
					
				}else{
					
					playTripleCard = [];
					
				}
				
				if(playTripleCard.length===3){
					
					break;
					
				}
				
			}
			
			if(playTripleCard.length==3){
				
				currentCard  = [];
				for(let x = 0; x < playTripleCard.length ; x++){
				
					currentCard.push(playTripleCard[x]);
				
				}
				
				return 1;
				
			}else if(playTripleCard.length!=3){
				
				return 0;
				
			}
			
		}
		
		//The code below allows AI to play in response to double cards in play
		function checkDouble(inputCurrentCard){
			
			let playDoubleCard = [];
			let biggerCurrentCard;
			
			if(inputCurrentCard[0].suitRank < inputCurrentCard[1].suitRank){
				
				biggerCurrentCard = inputCurrentCard[0];
				
			}else{
				
				biggerCurrentCard = inputCurrentCard[1];
				
			}
			
			for(let x = 0; x < currentCardArray.length ; x++){
				
				if(currentCardArray[x].comboDouble=="yes"){
					
					if(currentCardArray[x].textRank < biggerCurrentCard.textRank || (currentCardArray[x].textRank == biggerCurrentCard.textRank && currentCardArray[x].suitRank < biggerCurrentCard.suitRank)){
						
						if(playDoubleCard.length===0 || playDoubleCard[0].text===currentCardArray[x].text){
						
							playDoubleCard.push(currentCardArray[x]);
							
						}
						
					}
					
				}else{
					
					playDoubleCard = [];
					
				}
				
				if(playDoubleCard.length===2){
					
					break;
					
				}
				
			}
			
			if(playDoubleCard.length==2){
			
				currentCard = [];
				for(let x = 0; x < playDoubleCard.length ; x++){
				
					currentCard.push(playDoubleCard[x]);
				
				}
				
				return 1;
				
			}else if(playDoubleCard.length==0){
				
				return 0;
				
			}
			
		}
		
	}
	//The function below allows AI to pass
	function currentPlayerPass(){
		
		let currentPassCount = controlPassDetails.passCount + 1;
		firstStartCheck = "no";
		if(currentPassCount === 3){
		
			currentCard = [];
		
			document.getElementById("controlPlayerContainer").innerHTML = controlPlayer+" passed, control is now with " + controlPassDetails.originalControlPlayer;
			
		}
			let previousControlPlayer = controlPlayer;
			controlPassDetails.passCount = currentPassCount;
			if(controlPlayer == "AI1"){
			
				AI1CardArray = currentCardArray;
				controlPlayer = "user";
				
			}else if(controlPlayer === "AI2"){
				
				AI2CardArray = currentCardArray;
				controlPlayer = "AI1";
				
			}else if(controlPlayer === "AI3"){
				
				AI3CardArray = currentCardArray;
				controlPlayer = "AI2";
				
			}else if(controlPlayer === "user"){
				
				userCardArray = currentCardArray;
				controlPlayer = "AI3";
				
			}
			
			if(controlPlayer==="user"){
				
				if(controlPassDetails.passCount === 3){
					
					document.getElementById("passButton").style.display = "none";
					
				}else{
					
					document.getElementById("passButton").style.display = "inline-block";
					
				}
			
				goButton.innerHTML = "Choose your card(s).";
				currentMode = "userMode";
				cardsUserChose = [];
			}else{
				document.getElementById("passButton").style.display = "none";
				goButton.innerHTML = "AI Take Turn.";
				currentMode = "aiMode";
			}
		
			document.getElementById("controlPlayerContainer").innerHTML = previousControlPlayer+" passed, control is now with " + controlPlayer;
			
		
	}
	
	//The function below checks whether player's single card to be played is bigger than the current card in play
	function checkCurrentPlayCardBiggerThanCurrentCard(){
		
		if((currentPlayCard.textRank === currentCard[0].textRank && currentPlayCard.suitRank < currentCard[0].suitRank) ||
		
		currentPlayCard.textRank < currentCard[0].textRank){
			
			currentCard[0] = currentPlayCard;
			
			return "checkOK";
			
		}else{
			
			
			return "checkFail";
			
			
		}
		
	}
	
	//This function progress the game to the next user
	function moveToNextPlayer(){
		
		let selectedContainerToRemoveCards;
		let selectedContainerToRemoveCardsParent;
		resetCurrentPlayerPass();
		firstStartCheck = "no";
		
		if(controlPlayer === "AI1"){
		
			selectedContainerToRemoveCardsParent = document.getElementById("ai1container");
			selectedContainerToRemoveCards = document.getElementById("ai1container").children;
		
		}else if(controlPlayer === "AI2"){
			
			selectedContainerToRemoveCardsParent = document.getElementById("ai2container");
			selectedContainerToRemoveCards = document.getElementById("ai2container").children;
			
		}else if(controlPlayer === "AI3"){
			
			selectedContainerToRemoveCardsParent = document.getElementById("ai3container");
			selectedContainerToRemoveCards = document.getElementById("ai3container").children;
			
		}else if(controlPlayer === "user"){
		
			selectedContainerToRemoveCardsParent = document.getElementById("userContainer");
			selectedContainerToRemoveCards = document.getElementById("userContainer").children;
	
		}
	
			cardPlayed.innerHTML ="";
			
			for(let z = 0; z < currentCard.length; z++){
			
				for (let x = 0 ; x < currentCardArray.length; x++){
		
					if(selectedContainerToRemoveCards[x].dataset.text == currentCard[z]["text"] && selectedContainerToRemoveCards[x].dataset.suit == currentCard[z]["suit"]){

						selectedContainerToRemoveCardsParent.removeChild(selectedContainerToRemoveCards[x]);   
						break;
				
					}
				}

				for (let i = 0 ; i < currentCardArray.length; i++){
				
					if(currentCard[z]["text"] == currentCardArray[i]["text"] && currentCard[z]["suit"] == currentCardArray[i]["suit"]){
			
						currentCardArray.splice(i, 1);
					
						break;
						
					}
			
				}
				
				let e = document.createElement('div');
				
				e.classList.add("centerCardContainer");
				
			
				let inputFirstClassChar;
				
				if(currentCard[z].text === 2){
				
					inputFirstClassChar = "two";
				
				}else if(currentCard[z].text === 3){
				
					inputFirstClassChar = "three";
				
				}else if(currentCard[z].text === 4){
				
					inputFirstClassChar = "four";
				
				}else if(currentCard[z].text === 5){
				
					inputFirstClassChar = "five";
				
				}else if(currentCard[z].text === 6){
				
					inputFirstClassChar = "six";
				
				}else if(currentCard[z].text === 7){
				
					inputFirstClassChar = "seven";
				
				}else if(currentCard[z].text === 8){
				
					inputFirstClassChar = "eight";
				
				}else if(currentCard[z].text === 9){
				
					inputFirstClassChar = "nine";
				
				}else if(currentCard[z].text === 10){
				
					inputFirstClassChar = "ten";
				
				}else{
				
					inputFirstClassChar = currentCard[z].text;
				
				}
				
				e.classList.add(inputFirstClassChar + currentCard[z].suit);
				cardPlayed.appendChild(e);
				
			}
		
		if(currentCardArray.length === 0){
			
			alert(controlPlayer+" has won!");
			document.getElementById("controlPlayerContainer").innerHTML = "Game Ended. "+controlPlayer+" has won!";
			goButton.innerHTML = "Reset Game";
			
		}else{
			
			if(controlPlayer == "AI1"){
		
				AI1CardArray = currentCardArray;
				controlPlayer = "user";
				
			}else if(controlPlayer === "AI2"){
				
				AI2CardArray = currentCardArray;
				controlPlayer = "AI1";
				
			}else if(controlPlayer === "AI3"){
				
				AI3CardArray = currentCardArray;
				controlPlayer = "AI2";
				
			}else if(controlPlayer === "user"){
				
				userCardArray = currentCardArray;
				controlPlayer = "AI3";
				
			}
			
			document.getElementById("controlPlayerContainer").innerHTML = "Control is now with " + controlPlayer;
			if(controlPlayer==="user"){
				
				document.getElementById("passButton").style.display = "inline-block";
				
				goButton.innerHTML = "Choose your card(s).";
				currentMode = "userMode";
				cardsUserChose = [];
				
			}else{
				document.getElementById("passButton").style.display = "none";
				goButton.innerHTML = "AI Take Turn.";
				currentMode = "aiMode"
				
			}
		}
		

	}
	
	//The function below finds the player's smallest card in hand
	function findCurrentPlayerSmallestCard(){
			
			let playerCard = tempCardArray[0];
			let playerTextRank = tempCardArray[0]["textRank"];
			let playerSuitRank = tempCardArray[0]["suitRank"];
			
			for(var i = 0 ; i < tempCardArray.length ; i++){
				
				if(tempCardArray[i+1]){
					
					let nextPlayerTextRank = tempCardArray[i+1]["textRank"];
					let nextPlayerSuitRank = tempCardArray[i+1]["suitRank"];
					let nextPlayerCard = tempCardArray[i+1];
					
					if((playerTextRank === nextPlayerTextRank && nextPlayerSuitRank > playerSuitRank) || (playerTextRank < nextPlayerTextRank)){
					
						playerTextRank = nextPlayerTextRank;
						playerSuitRank = nextPlayerSuitRank;
						playerCard = nextPlayerCard;
						
					}
					
				}
				
			}
			
			return playerCard;
			
	}
	
	//The function below allows the first play of the game with diamond 3
	function firstStart(){

			let checkDiamond3Double = currentPlayCard.comboDouble;
			let checkDiamond3Flush = currentPlayCard.comboFlush;
			let checkDiamond3Triple = currentPlayCard.comboTriple;
			let checkDiamond3FourKind = currentPlayCard.comboFourOfaKind;
			
			let tempStraightArray = [currentCard[0]];
			for(let j = 0 ; j < currentCardArray.length ; j++){
			
				if(currentCardArray[j+1]){
			
					if(tempStraightArray[tempStraightArray.length-1].textRank - 1 === currentCardArray[j+1].textRank){
					
						for(let k = 0 ; k < tempStraightArray.length; k++){
						
							if(tempStraightArray[k].text === currentCardArray[j+1].text){
							
								continue;
							
							}else{
							
								if(k === tempStraightArray.length - 1){
								
									tempStraightArray.push(currentCardArray[j+1]);
								
								}
							
							}
						
						}
						
					}
					
					if(tempStraightArray.length === 5){
					
						break;
					
					}
					
				}
				
				if(tempStraightArray.length===5){
					
					break;
				
				}
			
			}
			
			if(tempStraightArray.length===5){
			
				currentCard = [];
					
				for(let i = 0 ; i < 5; i++){
					
					currentCard.push(tempStraightArray[i]);
				}
			
			}else if(checkDiamond3Double||checkDiamond3Triple||checkDiamond3FourKind){
				
				for(let x = 0; x < currentCardArray.length ; x++){
					
					if(currentCardArray[x].text === currentCard[0].text && currentCardArray[x].suit !== currentCard[0].suit){
						
						currentCard.push(currentCardArray[x]);
						
					}
					
				}
				
				if(currentCard.length === 4){
					
					currentCard[0].comboFourOfaKind = "yes";
					
					for(let z = 0 ; z < currentCardArray.length; z++){
					
						if(currentCardArray[z].text === currentCard[0].text && currentCardArray[z].suit !== currentCard[0].suit){
						
							if(typeof currentCardArray[z].comboFourOfaKind === 'undefined' && typeof currentCardArray[z].comboTriple === 'undefined' && typeof currentCardArray[z].comboDouble === 'undefined' && typeof currentCardArray[z].comboRoyalFlush === 'undefined'){
								
								currentCardArray[z].comboFourOfaKind = "yes";
								currentCard.push(currentCardArray[z]);
								break;
								
							}
							
						}	
				
					}
					
				}
			
				if(currentCard.length === 3){
					
					currentCard[0].comboTriple = "yes";
					
					for(let z = 0 ; z < currentCardArray.length; z++){
					
						if(currentCard[0].text!==currentCardArray[z].text && currentCardArray[z].comboDouble){
						
							currentCard.push(currentCardArray[z]);
						
						}
						
						if(currentCard.length===5){
						
							break;
						
						}
					
					}
				
				}
				
				if(currentCard.length === 2){
				
					currentCard[0].comboDouble = "yes";
					
					for(let z = 0 ; z < currentCardArray.length; z++){
					
						if(currentCard[0].text!==currentCardArray[z].text && currentCardArray[z].comboTriple){
						
							currentCard.push(currentCardArray[z]);
						
						}
						
						if(currentCard.length===5){
						
							break;
						
						}
					
					}
				
				}
				
				
			}else if(checkDiamond3Flush){
				
				currentCard[0].comboFlush = "yes";
				
				for(let x = 0; x < currentCardArray.length ; x++){
					
					if(currentCardArray[x].suit === currentCard[0].suit && currentCardArray[x].text !== currentCard[0].text){
						
						currentCard.push(currentCardArray[x]);
						
					}
					if(currentCard.length===5){
						
						break;
						
					}
					
				}
				
			}


	}
	
	//The function below allows AI to play any cards once all 3 players passed previously
	function controlRestartPlay(){
	
		let checkPlayerCardRoyalFlush = 0;
		let checkPlayerCardFourKind = 0;
		let checkPlayerCardTriple = 0;
		let checkPlayerCardDouble = 0;
		let checkPlayerCardFlush = 0;
		
		for(let z = 0 ; z < currentCardArray.length ; z++){
			
			if(currentCardArray[z].comboRoyalFlush){
			
				checkPlayerCardRoyalFlush++;
			}
			if(currentCardArray[z].comboFourOfaKind){
			
				checkPlayerCardFourKind++;
			}
			if(currentCardArray[z].comboTriple){
	
				checkPlayerCardTriple++;
			}
			if(currentCardArray[z].comboDouble){
		
				checkPlayerCardDouble++;
			}
			if(currentCardArray[z].comboFlush){
		
				checkPlayerCardFlush++;
			}
			
		}		

						if(checkPlayerCardFlush >= 5){
						
							for(let x = 0; x < currentCardArray.length; x++){
							
								if(currentCardArray[x].comboFlush){
								
									if(currentCard.length===0){
									
										currentCard.push(currentCardArray[x]);
									
									}else if(currentCard[0].text === currentCardArray[x].text){
									
										currentCard.push(currentCardArray[x]);
									
									}
								
								}
								if(currentCard.length===5){
									
									break;
								
								}
							
							}
						
						}else if(checkPlayerCardTriple>=3 && checkPlayerCardDouble>=2){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboTriple){
								
									if(currentCard.length===0){
									
										currentCard.push(currentCardArray[x]);
									
									}else if(currentCard[0].text === currentCardArray[x].text){
									
										currentCard.push(currentCardArray[x]);
									
									}
								
								}
								if(currentCard.length===3){
									
									break;
								
								}
							
							}
							
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboDouble){
								
									if(currentCard.length===3){
									
										currentCard.push(currentCardArray[x]);
									
									}else if(currentCard[3].text === currentCardArray[x].text){
									
										currentCard.push(currentCardArray[x]);
									
									}
								
								}
								if(currentCard.length===5){
									
									break;
								
								}
							
							}
							
						
						}else if(checkPlayerCardFourKind>=5){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboFourOfaKind){
								
									currentCard.push(currentCardArray[x]);
								
								}
								if(currentCard.length===5){
									
									break;
								
								}
							
							}
							
						
						}else if(checkPlayerCardFlush>=5){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboRoyalFlush){
								
									currentCard.push(currentCardArray[x]);
								
								}
								if(currentCard.length===5){
									
									break;
								
								}
						
							}
							
						}else if (checkPlayerCardTriple >= 3){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboTriple){
								
									if(currentCard.length===0){
									
										currentCard.push(currentCardArray[x]);
									
									}else if(currentCard[0].text === currentCardArray[x].text){
									
										currentCard.push(currentCardArray[x]);
									
									}
								
								}
								if(currentCard.length===3){
									
									break;
								
								}
							
							}
							
						}else if (checkPlayerCardDouble >= 2){
						
							for(let x = 0; x < currentCardArray.length; x++){
						
								if(currentCardArray[x].comboDouble){
								
									if(currentCard.length===0){
									
										currentCard.push(currentCardArray[x]);
									
									}else if(currentCard[0].text === currentCardArray[x].text){
									
										currentCard.push(currentCardArray[x]);
									
									}
								
								}
								if(currentCard.length===2){
									
									break;
								
								}
							
							}
							
						}else if (currentCard.length === 0){
							
							currentPlayCard = findCurrentPlayerSmallestCard();
							currentCard.push(currentPlayCard);
							
						}
						
						
		
	}
}

