//This function searches for the player who has the smallest card: diamond 3 to start the game. Once found, will set the owner of the card to be the first player.

function findDiamond3(){
	
	for(let i = 0 ; i < AI1CardArray.length ; i++){
		
		if(AI1CardArray[i]["text"]===3 && AI1CardArray[i]["suit"]==="diamond"){
			
			alert("AI1 has Diamond 3");
			controlPlayer = "AI1";
			break;
			
		}
		
	}
	
	for(let i = 0 ; i < AI2CardArray.length ; i++){
		
		if(AI2CardArray[i]["text"]===3 && AI2CardArray[i]["suit"]==="diamond"){
			
			alert("AI2 has Diamond 3");
			controlPlayer = "AI2";
			break;
			
		}
		
	}
	
	for(let i = 0 ; i < AI3CardArray.length ; i++){
		
		if(AI3CardArray[i]["text"]===3 && AI3CardArray[i]["suit"]==="diamond"){
			
			alert("AI3 has Diamond 3");
			controlPlayer = "AI3";
			break;
			
		}
		
	}
	
	for(let i = 0 ; i < userCardArray.length ; i++){
		
		if(userCardArray[i]["text"]===3 && userCardArray[i]["suit"]==="diamond"){
			
			alert("user has Diamond 3");
			controlPlayer = "user";
			
			break;
			
		}
		
	}
	
	document.getElementById("controlPlayerContainer").innerHTML = "Control is now with " + controlPlayer;
	
	if(controlPlayer==="user"){
		
		goButton.innerHTML = "Choose your card(s).";
		currentMode = "userMode";
		cardsUserChose = [];
	}else{
		
		goButton.innerHTML = "AI Take Turn.";
		currentMode = "aiMode";
	}
	
	
}

