import './App.css';

import Accueil from './components/Accueil/Accueil';
import Market from './components/Market/Market';
import UserData from './components/UserData/UserData';
import Header from './components/Header/Header';
import APropos from './components/APropos/APropos';
import Community from './components/Community/Community';

function App() {
	return (
		<>
		<header>
			<Header />
		</header>
		<section id="accueil">
			<Accueil/>
            <img src="etoiles.png" id="stars"/>
            <img src="lune.png" id="moon"/>
            <img src="montagne_derriere.png" id="mountains_behind"/>
		</section>
		<section id="marche">
			<Market />
			<img src="marche.png" id="marche"/>
		</section>
		<section id="collection">
			<UserData />
			<img src="cave.png" id="mountains_front"/>
		</section>
		<section id="communaute">
			<Community />
			<img src="lava1.jpg" id="mountains_front"/>
		</section>
		<section id="apropos">
			<APropos/>
		</section>
		</>
	);
}

export default App;