import GlobalMarketData from './GlobalMarketData';
import Balance from './MyBalance';

function Market() {
    return(
        <>
            <h2> Marché </h2>
            <GlobalMarketData/>
            <Balance />
        </>
    );
}

export default Market;