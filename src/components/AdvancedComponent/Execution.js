import React from 'react';
import { GET_MARKET_LISTINGS } from '../../cadence/get-market-listings.script';
import useAdvanced from '../../hooks/use-advanced.hook';

const Execution = () => {
    const {executeCustomScript, sendCustomTransaction}= useAdvanced()


    return(
        <div className="Execution">
            <div className="market-listings">
                <button onClick={() => executeCustomScript(document.querySelector('textarea').value)}> Script </button>
                <button> Transaction </button>
                <button> import </button>
            </div>
            <div>
                <label>Cadence</label>
                <textarea placeholder="Cadence"/>
            </div>
        </div>
    )
}

export default Execution