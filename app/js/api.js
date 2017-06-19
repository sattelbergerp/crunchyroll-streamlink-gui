const exec = require('child_process');

function httpGet(url, callback){
	console.log("HTTP GET: "+url)
	var http = new XMLHttpRequest();
	http.onreadystatechange = function(){
		try{
			if(http.readyState==4){
				if(http.status==200){
					callback(null, http.responseText);
				}else{
					callback(new Error("HTTP Error:<br>URL: "+url+"<br>Code: " + http.status + "<br>Message: " + http.statusText))
				}
			}
		}catch(e){callback(new Error("Network Error: "+ e.message))}
	};
	http.open("GET", url, true);
	http.send(null);
}


function getQualityMap(url, callback){
	args = ['-j'];
	if(getSession()){
		args.push('--crunchyroll-session-id');
		args.push(getSession());
	}
	args.push(url);
	exec.execFile('streamlink', args, {}, (error, stdout, stderr)=>{
		if(error){
			console.log("STDOUT: " + stdout);
			console.log("STDERR: " + stderr);
			callback(error);
		}else{
			callback(null, JSON.parse(stdout).streams)
		}
	});
}

function play(url, callback){
	try{
		exec.spawn(getPlayer(), [url], {stdio: 'ignore'});
	}catch(err){
		callback(err);
	}
}

function streamlinkPlay(url, callback){
	exec.execFile('streamlink', ['--crunchyroll-session-id', getSession(),url, "best"], {}, (error, stdout, stderr)=>{
		console.log("STDOUT: " + stdout);
		console.log("STDERR: " + stderr);
		callback(error);
	});
}
