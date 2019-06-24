//The function checks whether the cards the human player chose can be played in response to the current cards in play







function userPlayGame(){
	
	cardsUserChose.sort( compare );//sort the player's chosen cards in ascending order
	
	if(controlPassDetails.passCount >= 3){//if all 3 previous players passed previously, human player has free control and can play any cards, current cards in play cleared
		
		currentCard = [];
		
	}
	
	if(cardsUserChose.length!==0){//If there is at least one card in human player's chosen card
		
		if(firstStartCheck === "no"){//If diamond 3 first play round is already played
			
			let checkCanPlay = "no";//initial initializer to check whether the cards the player chosen can be played 
			let checkUserStraightHas;
			let checkUserFlushHas;
			let checkUserTriple;
			let checkUserFour;
			let checkUserRoyalHas;
			
			if(currentCard.length===0){//if all 3 previous players passed previously, human player has free control and can play any cards, current cards in play cleared
				
				if(cardsUserChose.length===5){//If player chose 5 cards
					
					//Below codes check whether the 5 cards the player chose is a valid combination
					checkUserStraightHas = checkUserStraight(cardsUserChose);
					checkUserFlushHas = checkUserFlush(cardsUserChose);
					checkUserTriple = checkUserThreeKind(cardsUserChose);
					checkUserFour = checkUserFourKind(cardsUserChose);
					checkUserRoyalHas = checkUserRoyal(cardsUserChose);
					
					if(checkUserStraightHas || checkUserFlushHas == "yes" || checkUserTriple == "yes" || checkUserFour == "yes" || checkUserRoyalHas == "yes"){
				
						checkCanPlay = "yes";
					
					}
					
				}else if(cardsUserChose.length===3){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text && cardsUserChose[1].text == cardsUserChose[2].text){
						
						checkCanPlay = "yes";
						
					}
					
				}else if(cardsUserChose.length===2){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text){
					
						checkCanPlay = "yes";
					
					}
					
				}else if(cardsUserChose.length===1){
					checkCanPlay = "yes";
					
					
				}
			
				
		
			}else if(currentCard.length===5){//If there are 5 cards in play, human player must play 5 cards in valid combination, if not pass
				
				if(cardsUserChose.length===5){
					
					//The code below checks whether the 5 cards the player chose has valid combo and can be played in response to the combo in play
					let checkPreviousStraight;
					let checkPreviousFlush;
					let checkPreviousTriple;
					let checkPreviousFour;
					let checkPreviousRoyal;
					
					let checkUserStraightHas;
					let checkUserFlushHas;
					let checkUserTriple;
					let checkUserFour;
					let checkUserRoyalHas;
					
					checkPreviousStraight = checkUserStraight(currentCard);
					checkPreviousFlush = checkUserFlush(currentCard);
					checkPreviousTriple = checkUserThreeKind(currentCard);
					checkPreviousFour = checkUserFourKind(currentCard);
					checkPreviousRoyal = checkUserRoyal(currentCard);
					
					checkUserStraightHas = checkUserStraight(cardsUserChose);
					checkUserFlushHas = checkUserFlush(cardsUserChose);
					checkUserTriple = checkUserThreeKind(cardsUserChose);
					checkUserFour = checkUserFourKind(cardsUserChose);
					checkUserRoyalHas = checkUserRoyal(cardsUserChose);
					
					
					if(checkPreviousStraight == "yes"){
						
						if(checkUserFlushHas == "yes" || checkUserTriple == "yes" || checkUserFour == "yes" || checkUserRoyalHas == "yes"){
							
							checkCanPlay = "yes";
							
						}else if(checkUserStraightHas == "yes"){
							
							if((currentCard[4].textRank > cardsUserChose[4].textRank) || (currentCard[4].textRank == cardsUserChose[4].textRank && currentCard[4].suitRank > cardsUserChose[4].suitRank)){
								
								checkCanPlay = "yes";
								
							}
							
						}
						
						
					}else if(checkPreviousFlush == "yes"){
						
						if(checkUserTriple == "yes" || checkUserFour == "yes" || checkUserRoyalHas == "yes"){
							
							checkCanPlay = "yes";
							
						}else if(checkUserFlushHas == "yes"){
							
							if((currentCard[4].suitRank > cardsUserChose[4].suitRank) || (currentCard[4].suitRank == cardsUserChose[4].suitRank && currentCard[4].textRank > cardsUserChose[4].textRank)){
								
								checkCanPlay = "yes";
								
							}
							
						}
						
						
					}else if(checkPreviousTriple == "yes"){
						
						if(checkUserFour == "yes" || checkUserRoyalHas == "yes"){
							
							checkCanPlay = "yes";
							
						}else if(checkUserTriple == "yes"){
							
							if(currentCard[2].textRank > cardsUserChose[2].textRank){
								
								checkCanPlay = "yes";
								
							}
							
						}
						
					}else if(checkPreviousFour == "yes"){
						
						if(checkUserRoyalHas == "yes"){
							
							checkCanPlay = "yes";
							
						}else if(checkUserFour == "yes"){
							
							if(currentCard[2].textRank > cardsUserChose[2].textRank){
								
								checkCanPlay = "yes";
								
							}
							
						}
						
					}else if(checkPreviousRoyal == "yes"){
						
						if(checkUserRoyalHas == "yes"){
							
							if((currentCard[4].textRank > cardsUserChose[4].textRank) || (currentCard[4].textRank == cardsUserChose[4].textRank && currentCard[4].suitRank > cardsUserChose[4].suitRank)){
								
								checkCanPlay = "yes";
								
							}
							
						}
						
					}
					
				}
			}else if(currentCard.length===3){//Human player must play 3 cards in reponse if the current play has 3
				
				if(cardsUserChose.length===3){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text && cardsUserChose[1].text == cardsUserChose[2].text){
						
						if(cardsUserChose[0].textRank < currentCard[0].textRank){
							
							checkCanPlay = "yes";
							
						}
						
					}
					
				}
				
			}else if(currentCard.length===2){//Human player must play 2 cards in reponse if the current play has 2
				
				if(cardsUserChose.length===2){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text){
						
						let biggerDouble;
						let biggerUserDouble;
						
						if(cardsUserChose[0].suitRank < cardsUserChose[1].suitRank){
							
							biggerUserDouble = cardsUserChose[0];
							
						}else{
							
							biggerUserDouble = cardsUserChose[1];
							
						}
						
						if(currentCard[0].suitRank < currentCard[1].suitRank){
							
							biggerDouble = currentCard[0];
							
						}else{
							
							biggerDouble = currentCard[1];
							
						}
					
						if((biggerDouble.textRank === biggerUserDouble.textRank && biggerDouble.suitRank > biggerUserDouble.suitRank) || (biggerDouble.textRank > biggerUserDouble.textRank)){
							
							checkCanPlay = "yes";
							
						}
						
					}
					
				}
				
			}else if(currentCard.length===1){//This code checks whether the single card the human player played can be played in response to the current single card in play
				
				if(currentCard[0].textRank > cardsUserChose[0].textRank || (currentCard[0].textRank == cardsUserChose[0].textRank && currentCard[0].suitRank > cardsUserChose[0].suitRank)){
					
					currentCard = [];
					currentCard.push(cardsUserChose[0]);
					
					checkCanPlay = "yes";
					
				}
				
				
			}
				//Final Checker, if the cards player chose can be played in response to the current cards in play, above functions will return checkCanPlay = "yes", which changes the current cards in play to that of the cards the player chose, then finish player's turn to progress
				if(checkCanPlay == "yes"){
					
					currentCard = [];
					for(let x = 0 ; x < cardsUserChose.length; x++){
						
						currentCard.push(cardsUserChose[x]);
					}
					
					playerFinishedTurn();
					
				}
			
		}else{//The code below is similar to that above, only difference is this code plays in response to a diamond 3 start with the user
			
			let checkDiamond3Exist = "no";
			
			for(let i = 0 ; i < cardsUserChose.length; i++){
				
				if(cardsUserChose[i].text == 3 && cardsUserChose[i].suit === "diamond"){
					
					checkDiamond3Exist = "yes";
					break;
					
				}
			}
			if(checkDiamond3Exist == "yes"){
				
				let checkCanPlay = "no";
				
				if(cardsUserChose.length===2){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text){
						
						checkCanPlay = "yes";
						
					}
				}else if(cardsUserChose.length===3){
					
					if(cardsUserChose[0].text == cardsUserChose[1].text && cardsUserChose[1].text == cardsUserChose[2].text){
						
						checkCanPlay = "yes";
						
					}
				}else if(cardsUserChose.length===1){
					
					checkCanPlay = "yes";
					
				}else if(cardsUserChose.length===5){
					
					checkCanPlay = checkUserFlush(cardsUserChose);
					if(checkCanPlay === "no"){
						
						checkCanPlay = checkUserThreeKind(cardsUserChose);
						
						if(checkCanPlay === "no"){
						
							checkCanPlay = checkUserFourKind(cardsUserChose);
							
							if(checkCanPlay === "no"){
						
								checkCanPlay = checkUserStraight(cardsUserChose);
								
								if(checkCanPlay === "no"){
						
									checkCanPlay = checkUserRoyal(cardsUserChose);
								
								}
							}
							
						}
						
					}
				}
				
				if(checkCanPlay == "yes"){
					
					currentCard = [];
					for(let x = 0 ; x < cardsUserChose.length; x++){
						
						currentCard.push(cardsUserChose[x]);
					}
					
					playerFinishedTurn();
						
				}else{
					
					alert("Please choose a valid combi.");
					
				}
				
			}else{
				
				alert("Please start with Diamond 3!");
				
			}
			
		}
		
		
	}else{
		
		alert("Please choose at least one card");
	}
	
	function checkUserFlush(inputSelection){
		
		if(inputSelection[0].suit === inputSelection[1].suit && inputSelection[1].suit === inputSelection[2].suit && inputSelection[2].suit === inputSelection[3].suit && inputSelection[3].suit === inputSelection[4].suit){
			
			return "yes";
			
		}else{
			
			return "no";
		}
		
	}
	function checkUserThreeKind(inputSelection){
		
		if((inputSelection[0].text == inputSelection[1].text && inputSelection[1].text == inputSelection[2].text && inputSelection[3].text == inputSelection[4].text) || (inputSelection[0].text == inputSelection[1].text && inputSelection[2].text == inputSelection[3].text && inputSelection[3].text == inputSelection[4].text)){
			
			return "yes";
			
		}else{
			
			return "no";
		}
		
	}
	
	function checkUserFourKind(inputSelection){
		
		if((inputSelection[0].text == inputSelection[1].text && inputSelection[1].text == inputSelection[2].text && inputSelection[2].text == inputSelection[3].text) || (inputSelection[1].text == inputSelection[2].text && inputSelection[2].text == inputSelection[3].text && inputSelection[3].text == inputSelection[4])){
			
			return "yes";
			
		}else{
			
			return "no";
		}
		
	}
	function checkUserStraight(inputSelection){
		
		if(inputSelection[0].textRank - 1 === inputSelection[1].textRank && inputSelection[1].textRank - 1 === inputSelection[2].textRank && inputSelection[2].textRank - 1 === inputSelection[3].textRank && inputSelection[3].textRank - 1 === inputSelection[4].textRank){
			
			return "yes";
			
		}else{
			
			return "no";
		}
		
	}
	function checkUserRoyal(inputSelection){
		
		if((inputSelection[0].textRank - 1 == inputSelection[1].textRank && inputSelection[1].textRank - 1 == inputSelection[2].textRank && inputSelection[2].textRank - 1 == inputSelection[3].textRank && inputSelection[3].textRank - 1 == inputSelection[4].textRank) && (inputSelection[0].suit === inputSelection[1].suit && inputSelection[1].suit === inputSelection[2].suit && inputSelection[2].suit === inputSelection[3].suit && inputSelection[3].suit === inputSelection[4].suit)){
			
			return "yes";
			
		}else{
			
			return "no";
		}
		
	}
	
}


