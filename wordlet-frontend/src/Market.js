import './Market.css';
import MarketData from './MarketData';
import Balance from './MyBalance';

function Market() {
    return(
        <div className={"Market"}>
            <h2> Marché </h2>
            <h1>En cours de construction...</h1>
            <MarketData />
            <Balance />
        </div>
    );
}

export default Market;