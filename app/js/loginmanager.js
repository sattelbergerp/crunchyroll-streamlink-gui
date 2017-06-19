var session = require('electron').remote.getCurrentWebContents().session;

session.cookies.on('changed', (event, cookie, cause, removed)=>{
	if(cookie.name=='sess_id' || cookie.name=='session_id'){
		console.log('Your session id changed: ' + cookie.name + "="+cookie.value + " @ " + cookie.domain + ", Removed? " + removed);
		if(removed){
			localStorage.session = null;
			console.log("Removed SID");
		}else{
			localStorage.session = cookie.value;
			console.log("SET SID: " + localStorage.session);
		}
	}
});

function getSession(){
	if(localStorage.session=="null")return null;
	return localStorage.session;
}

function updateLoggedIn(){

}

function showLogin(){
	showView.src='https://crunchyroll.com/login';
}
