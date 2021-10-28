import './App.css';

import Accueil from './components/Accueil';
import Market from './components/Market/Market';
import UserData from './components/UserData/UserData';
import Header from './components/Header';
import APropos from './components/APropos';
import Community from './components/Community/Community';
import Providers from './providers/Providers.comp';

function App() {
	return (
		<Providers>
				<Header />
				<Accueil/>
				<section id="marche">
					<Market />
					<img src="marche.png" id="marche" alt=""/>
				</section>
				<section id="collection">
					<UserData />
					<img src="cave.png" id="mountains_front" alt=""/>
				</section>
				<Community />
				<APropos/>
		</Providers>
	);
}

export default App;