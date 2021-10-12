import './App.css';
import UserData from './UserData';
import Balance from './MyBalance';
import SetupAccount from './SetupAccount';

function App() {
return (
	<div className="App">
	<h2> Mes Tokens </h2>
	<UserData />
	<Balance />
	<SetupAccount />
	
	</div>
);
}

export default App;