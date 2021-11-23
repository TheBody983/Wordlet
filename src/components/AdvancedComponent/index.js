import React from 'react';
import FlowData from './FlowData';
import TokensData from './TokensData';
import Execution from './Execution';

const Admin = () => {
    return(
        <section className="admin">
            <div className="market-listings">
                <TokensData/>
                <FlowData/>
            </div>
            <Execution/>
            <img src="marche.png" id="marche" alt=""/>
        </section>
    )
}

export default Admin