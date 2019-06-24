//This function sorts the input array in ascending order when used with sort. Used in muliple areas.



function compare( a, b ) {
	  if ( a.textRank < b.textRank ){
		return 1;
	  }
	  if ( a.textRank > b.textRank ){
		return -1;
	  }
	  return 0;
	}

