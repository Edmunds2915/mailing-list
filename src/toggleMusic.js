let isMusicPlaying = false;

function toggleMusic() {
	switch(isMusicPlaying) {
		case true: 
			document.getElementById("myAudio").pause(); 
			document.getElementById("musicBtn").innerHTML = "Play music";
			isMusicPlaying = false;
			break;
		case false: 
			document.getElementById("myAudio").play(); 
			document.getElementById("musicBtn").innerHTML = "Pause music";
			isMusicPlaying = true;
			break;
	}			
}