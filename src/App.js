import './App.css';

import AuthCluster from './AuthCluster';
import Contacts from './community/Contacts';
import Discord from './community/Discord';
import Market from './Market';
import UserTokens from './UserTokens';

function App() {
	return (
		<>
		<header>
			<ul>
				<li><a href="#accueil" id="btnaccueil" class="active">Accueil</a></li>
				<li><a href="#marche" id="btnmarche">Marché</a></li>
				<li><a href="#collection" id="btncollection">Collection</a></li>
				<li><a href="#jeux" id="btnjeux">Jeux</a></li>
				<li><a href="#apropos" id="btnpropos">À propos</a></li>
			</ul>
		</header>
		<section id="accueil">
			<img src="etoiles.png" id="stars"/>
			<img src="lune.png" id="moon"/>
			<img src="montagne_derriere.png" id="mountains_behind"/>
			<h1 id="wordlet-title">Wordlet</h1>
			<AuthCluster />

		</section>
		<section id="marche">
			<Market />
			<img src="marche.png" id="marche"/>
		</section>
		<section id="collection">
			<UserTokens />
			<img src="cave.png" id="mountains_front"/>
		</section>
		<section id="communaute">
			<Discord />
			<Contacts />
			<img src="lava1.jpg" id="mountains_front"/>
		</section>
		<section id="apropos">
		<h2>Wordlet</h2>
			<p>
				<br/>Projet de BIHANNIC Lucas, RICHARD Damien et TRONEL Ludovic.
				<br/> Tous 3 étudiants en licence Informatique à l'Université de la Nouvelle-Calédonie.
				<br/>Wordlet, de la compression de Word Wallet, littéralement traduit par "le portefeuille de mots", 
				est une application permettant l'introduction au monde des blockchain par le biais de NFT (Token Non Fongible) 
				sous forme de mots, qui peuvent être achetés, vendus, échangés où joués et gagnés par le biais de différents 
				jeux. Ces derniers peuvent être codés par les utilisateurs à partir de code open source, les meilleurs d'entre 
				eux sont votés par les joueurs et les plus populaires seront implémentés par les créateurs de l'application. </p>

		</section>
		
		</>
	);
}

export default App;