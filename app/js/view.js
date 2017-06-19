function generateShowli(index, image, count){
	var html = ''
	html+='<li class="list-group-item show-list-item"';
	if(image)html+='style="animation-delay: '+(count/20)+'s;" ';
	html+='onclick="openShow('+index+')">';
	if(image)html+='<img class="media-object pull-left" src="'+shows[index].img+'" width="50" height="28">';
	else html+='<div class="show-thumb-placeholder pull-left"></div>';
	html+='<strong>'+shows[index].name+'</strong>'
	//html+='<p>'+show.type+'</p>'
	html+='<div class="media-body">'
	html+='</div></li>'
	return html;
}

function setLoader(id, enabled){
	document.getElementById(id+'-loader').style.opacity=(enabled? '1' : '0');
}

function showError(msg, title){
	if(!title)title="Error";
	document.getElementById('error-title').innerHTML=title;
	document.getElementById('error-content').innerHTML=msg;
	document.getElementById('error-popup').style.display='block';
}

function hideError(){
	document.getElementById('error-popup').style.display='none';
}
