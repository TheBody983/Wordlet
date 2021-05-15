import './App.css';
import TokenData from './TokenData';
import TokenData2 from './TokenData2';
import UserData from './UserData';
import MarketData from './MarketData';
import { AuthCluster } from './AuthCluster';
import Balance from './MyBalance';
import MintPinnie from './MintPinnie';

function App() {
  return (
    <div className="App">
      <h1> Wordlet </h1>
      <AuthCluster/>
      <Balance />
      <MintPinnie />
      <h2> Mes Tokens </h2>
      <UserData />
      <TokenData />
      <TokenData2 tokenId={1}/>
      <h2> Marché </h2>
      <MarketData />
    </div>
  );
}

export default App;