import './App.css';
import UserData from './UserData';
import Balance from './MyBalance';

function App() {
	return (
		<div className="App">
			<h2> Mes Tokens </h2>
			<UserData />
			<Balance />
		</div>
	);
}

export default App;