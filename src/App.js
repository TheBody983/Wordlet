import './App.css';

import Accueil from './components/Accueil';
import Market from './components/Market';
import Header from './components/Header';
import APropos from './components/APropos';
import Community from './components/Community';
import Collection from './components/Collection';
import Providers from './providers/Providers.comp';

function App() {
	return (
		<Providers>
			<Header />
			<Accueil/>
			<Market />
			<Collection />
			<Community />
			<APropos/>
		</Providers>
	);
}

export default App;