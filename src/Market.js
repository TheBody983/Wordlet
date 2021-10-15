import './Market.css';
import MarketData from './MarketData';
import Balance from './MyBalance';

function Market() {
    return(
        <div className={"Market"}>
            <h2> Marché </h2>
            <MarketData />
            <Balance />
        </div>
    );
}

export default Market;