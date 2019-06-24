//This function runs when the human player finished his turn, the function will then proceed with the game by doing the following:
//Remove cards displayed on the UI that were played
//Remove cards from the players cards array (hand)
//Display the played cards to the center container
//Checks whether the player has any cards left after the play, if theres no cards left, player wins
//Hides the pass button 
//Resets the consecutive pass counter as player did not pass




	function playerFinishedTurn(){
		
		let selectedContainerToRemoveCards;
		let selectedContainerToRemoveCardsParent;
		resetCurrentPlayerPass();
	
		let currentCardArray = userCardArray;
		selectedContainerToRemoveCardsParent = document.getElementById("userContainer");
		selectedContainerToRemoveCards = document.getElementById("userContainer").children;
	
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
				
				if(currentCard[z].text == 2){
				
					inputFirstClassChar = "two";
				
				}else if(currentCard[z].text == 3){
				
					inputFirstClassChar = "three";
				
				}else if(currentCard[z].text == 4){
				
					inputFirstClassChar = "four";
				
				}else if(currentCard[z].text == 5){
				
					inputFirstClassChar = "five";
				
				}else if(currentCard[z].text == 6){
				
					inputFirstClassChar = "six";
				
				}else if(currentCard[z].text == 7){
				
					inputFirstClassChar = "seven";
				
				}else if(currentCard[z].text == 8){
				
					inputFirstClassChar = "eight";
				
				}else if(currentCard[z].text == 9){
				
					inputFirstClassChar = "nine";
				
				}else if(currentCard[z].text == 10){
				
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
			
			if(controlPlayer === "user"){
				
				userCardArray = currentCardArray;
				controlPlayer = "AI3";
				
			}
			document.getElementById("passButton").style.display = "none";
			document.getElementById("controlPlayerContainer").innerHTML = "Control is now with " + controlPlayer;
			goButton.innerHTML = "AI Take Turn.";
			currentMode = "aiMode"
		}

	}
