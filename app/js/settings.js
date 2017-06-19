var settings = {playerCommand: 'vlc'}

function showSettings(){
	document.getElementById('player-command').value = getPlayer();
	document.getElementById('cr-session-id').value = getSession();
	document.getElementById('settings-popup').style.display='block';
}

function hideSettings(){
	localStorage.player = document.getElementById('player-command').value;
	document.getElementById('settings-popup').style.display='none';
}

function getPlayer(){
	player = localStorage.player;
	if(player==null)player = 'mpv';
	return player;
}
