let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('wordlet-title');
let header = document.querySelector('header');

window.addEventListener('scroll', function (){
	let value = window.scrollY;
	stars.style.left = value + 'px';
	moon.style.top = value +'px';
	if ( value <= 1000) {
	mountains_behind.style.top = value * 0.5 + 'px';
	}
	if ( value <= 425) {
	text.style.marginLeft = value * 3.1 + 'px';
	text.style.fontSize = 145 - (0.20 * value) + 'px';
	}
	if ( value >= 425 ) {
	text.style.top = value +'px';
	}
})