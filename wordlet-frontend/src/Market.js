import './Market.css';
import MarketData from './MarketData';
import Balance from './MyBalance';
import MintPinnie from './MintPinnie';

function Market() {
    return(
        <div className={"Market"}>
            <h2> Marché </h2>
            <h1>En cours de construction...</h1>
            <MarketData />
            <Balance />
            <MintPinnie />
        </div>
    );
}

export default Market;