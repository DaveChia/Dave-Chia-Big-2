//This script contains all the human interface controls needed to play the game





//The function below progresses the game when the player clicks 'goButton', the button works differently as per various conditions
let goButton = document.getElementById("goButton");
goButton.addEventListener("click", function(event){
	
	let currentButtonHTML = event.target.innerHTML;//Find current button inner html
	
	//Starts the game and finds which player has diamond 3. Only appears at start of game
	if( currentButtonHTML === "Start Game"){
		
		findDiamond3();
	
	//Refreshes the page and resets the game once there is a winner and game ends. Will only appear when game ends
	}else if(currentButtonHTML === "Reset Game"){
		
		resetGame();
	
	//Lets the AI take their turn once the human player click this button, will only appear when it is not the user's turn during the game.
	}else if(currentButtonHTML === "AI Take Turn."){
		
		AIPutCard();
	
	//Checks whether the human player played the allowed cards, if correct, will proceed the game.
	}else{
		
		userPlayGame();
	}
  
}); 






//This function allows the user to select and deselect the cards they choose to be played.
$(function() {
$(".userCards").click(function(e){
		
		//Only runs function when it is the human player's turn
		if(currentMode === "userMode"){
			
			//Get data from the card clicked
			let selectedText = e.target.getAttribute("data-text");
			let selectedSuit = e.target.getAttribute("data-suit");
			
			//Checks whether the card is selected or not
			if($(this).hasClass("userSelected")){
			  
				$(this).removeClass('userSelected');
			   e.target.style.border = "none";
				//Remove selected card into human player selected array
				if(cardsUserChose.length!==0){
				
				   for(let x = 0 ; x < cardsUserChose.length; x++){
					   
					   if(cardsUserChose[x].text == selectedText && cardsUserChose[x].suit == selectedSuit){
						   
						   cardsUserChose.splice(x, 1);
						   
					   }
					   
				   }
				   
				}
			   
			}else{
			  //Add selected card into human player selected array
			  $(this).addClass('userSelected');
			  e.target.style.border = "2px solid red";
			  
			  if(cardsUserChose.length<5){
			
				  for(let x = 0 ; x < userCardArray.length; x++){
					  
					  if(userCardArray[x].text == selectedText && userCardArray[x].suit == selectedSuit){
						  
						   cardsUserChose.push(userCardArray[x]);
							
					  }
					  
				  }
				  
			  }else{
				  
				  alert("you can only choose up to 5 cards.");
			  }
			  
			  
			  
			}
		  
		}

	}); 

})





//This function allows the human player to skip his turn when the pass button is pressed
$(function() {
	$("#passButton").click(function(e){
			
			let currentPassCount = controlPassDetails.passCount + 1;//Add counter to the number of consecutive passes (Global Variable)
			firstStartCheck = "no";//Change global variable to indicate that game has already started
			
			if(currentPassCount === 3){//Resets the current card in game once all 3 previous player passed. Human player can play any card
			
				currentCard = [];
			
				document.getElementById("controlPlayerContainer").innerHTML = controlPlayer+" passed, control is now with " + controlPassDetails.originalControlPlayer;
				
			}else{//Hides the pass button once it is not the human player's turn
				
				document.getElementById("passButton").style.display = "none";
				
			}
				document.getElementById("passButton").style.display = "none";
				let previousControlPlayer = controlPlayer;//Changes the player
				controlPassDetails.passCount = currentPassCount;
				controlPlayer = "AI3";
				goButton.innerHTML = "AI Take Turn.";
				currentMode = "aiMode";//Changes mode to AI instead of human
				document.getElementById("controlPlayerContainer").innerHTML = previousControlPlayer+" passed, control is now with " + controlPlayer;
				
				
	}); 
})
