/* toggle to show the table of contents */

function toc_toggle(e){
	var box=document.getElementById(e);
	if(box.style.display=='none'){
		box.style.display='block';}
	else{box.style.display='none';}
}

// Typed Text Animation
var typed = new Typed('#cp_typed', {
	stringsElement: '#cp_typed-strings',
	loop: true,
	typeSpeed: 100,
	backSpeed: 50,
	backDelay: 1500,
  });
