var shows = undefined;

var showView = document.querySelector('#show-view');
showView.addEventListener("dom-ready", showViewLoaded);
showView.addEventListener("did-start-loading", showViewStartedLoading);
showView.addEventListener("did-stop-loading", showViewStoppedLoading);
showView.addEventListener("console-message", showViewMessage);
document.querySelector('#show-list').style.height='calc(100% - '+document.querySelector('#show-list-search').parentElement.offsetHeight+'px)';

function fetchShows(){
	setLoader('show-list', true);
	document.getElementById('show-list').innerHTML='';
	httpGet('http://www.crunchyroll.com/ajax/?req=RpcApiSearch_GetSearchCandidates', (err, data)=>{
		if(err){
			setLoader('show-list', false);
			showError(err.message, 'Error Getting Show List');
		}else{
			shows = JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}')+1)).data
			searchShows();
			setLoader('show-list', false);
		}
	});
}

function openShow(index){
	showView.src='https://crunchyroll.com'+shows[index].link;
}

function searchShows(query){
	if(!shows)return;
	if(!query)query = document.getElementById('show-list-search').value;
	var html = '';
	var count = 0;
	for(var i = 0; i < shows.length; i++){
		if(shows[i].name&&shows[i].type=="Series"&&(query==null||query==''||shows[i].name.toLowerCase().includes(query.toLowerCase()))){
			html+=generateShowli(i, count<20, count);
			count++;
		}
	}
	document.getElementById('show-list').innerHTML=html;
}

function showViewStartedLoading(){
	setLoader('show-view', true);
	showView.style['pointer-events'] = 'none';
}

function showViewStoppedLoading(){
	setLoader('show-view', false);
	showView.style['pointer-events'] = 'all';
}

function showViewLoaded(){
	showView.send("replaceLinks");
	updateLoggedIn();
}

function showViewMessage(event){
	var msg = event.message;
	if(msg.startsWith('open:')){
		console.log('OPEN: ' + msg.substr(5));
		openEpisode(msg.substr(5));
	}else{
		console.log('showView: '+msg);
	}
}

/*function openEpisode(url){
	streamlinkPlay(url, (err)=>{
		if(err)showError("Full Error:<br>"+err.message, "Failed to Open Streamlink");
	});
}*/

function openEpisode(url){
	setLoader('show-view', true);
	showView.style['pointer-events'] = 'none';
	getQualityMap(url, (err, streams)=>{
		setLoader('show-view', false);
		showView.style['pointer-events'] = 'all';
		if(err){
			showError("There was an error running streamlink. You can run 'pip install streamlink' to install streamlink. Please note that this command requires python to be installed.<br>Full Error:<br>"+err.message, "Failed to get Episode Information");
		}else{
			play(streams['best'].url, (err)=>{
				if(err)showError("Failed to open video player. Please open the settings and set the player command.<br>Full Error:<br>"+err.message, "Failed to Open Player");
			});
		}
	});
}

//updateLoggedIn();
fetchShows();
