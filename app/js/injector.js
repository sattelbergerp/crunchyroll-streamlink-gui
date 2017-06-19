const {ipcRenderer} = require('electron');

ipcRenderer.on('replaceLinks', function(){
	episodes = document.getElementsByClassName('episode');
	for(var i = 0; i < episodes.length; i++){
		var episode = episodes[i];
		var url = episode.href;
		episode.href='javascript:console.log("open:'+url+'")';
		episode.onclick=function(event){
			console.log(event);
		};
	}
});

function openEpisode(url){
	ipcRenderer.sendToHost("open", url);
}
