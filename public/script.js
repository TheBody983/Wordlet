
let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mountains_front = document.getElementById('mountains_front');
let header = document.querySelector('header');
let btnaccueil = document.getElementById('btnaccueil');
let btnmarche = document.getElementById('btnmarche');
let btncollection = document.getElementById('btncollection');
let btnjeux = document.getElementById('btnjeux');
let btnpropos = document.getElementById('btnpropos');

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
	btn.style.marginRight = value * 3.5 +'px';
	header.style.top = value * 1 +'px';
})


btnaccueil.onclick = function() { btnaccueil.setAttribute('class', 'active');
	btnmarche.setAttribute('class', ' ');
	btncollection.setAttribute('class', ' ');
	btnjeux.setAttribute('class', ' ');
	btnpropos.setAttribute('class', ' ');
};
btnmarche.onclick = function() { btnaccueil.setAttribute('class', ' ');
	btnmarche.setAttribute('class', 'active');
	btncollection.setAttribute('class', ' ');
	btnjeux.setAttribute('class', ' ');
	btnpropos.setAttribute('class', ' ');
};
btncollection.onclick = function() { btnaccueil.setAttribute('class', ' ');
	btnmarche.setAttribute('class', ' ');
	btncollection.setAttribute('class', 'active');
	btnjeux.setAttribute('class', ' ');
	btnpropos.setAttribute('class', ' ');
};
btnjeux.onclick = function() { btnaccueil.setAttribute('class', ' ');
	btnmarche.setAttribute('class', ' ');
	btncollection.setAttribute('class', ' ');
	btnjeux.setAttribute('class', 'active');
	btnpropos.setAttribute('class', ' ');
};
btnpropos.onclick = function() { btnaccueil.setAttribute('class', ' ');
	btnmarche.setAttribute('class', ' ');
	btncollection.setAttribute('class', ' ');
	btnjeux.setAttribute('class', ' ');
	btnpropos.setAttribute('class', 'active');
};
