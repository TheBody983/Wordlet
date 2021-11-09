import './App.css';

import Accueil from '../components/Accueil';
import Market from '../components/Market';
import Collection from '../components/Collection';
import Games from '../components/Games';
import Credits from '../components/Credits'
import Providers from '../providers/Providers.comp';
import Header from '../components/Header';

function App() {
    return (
        <Providers>
            <Header/>
            <Accueil/>
            <Market />
            <Collection />
            <Games />
            <Credits />
        </Providers>
    );
}

export default App;