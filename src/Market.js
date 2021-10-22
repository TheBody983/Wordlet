import './Market.css';
import GlobalMarketData from './GlobalMarketData';
import Balance from './MyBalance';

function Market() {
    return(
        <div className={"Market"}>
            <h2> Marché </h2>
            <GlobalMarketData/>
            <Balance />
        </div>
    );
}

export default Market;