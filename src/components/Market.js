import React from "react";

import { useAuth } from "../providers/AuthProvider";
import { useUser } from "../providers/UserProvider";

import WordToken from "./WordToken";
import Balance from './Balance';

const GlobalMarketData = () => {
    const { user } = useAuth( )
    const { marketListings, getMarketListings} = useUser( user )

    return (
        
        <section id="marche">
            <h2> Marché </h2>
            <div className="market-listings">
            {marketListings?.map(token => {
                return (
                    <WordToken market key={token.id} tokenId={token.id} seller={token.seller}/>
                )
            })
            }
            <button onClick={()=>getMarketListings()}/>
            </div>
            <Balance />
            <img src="marche.png" id="marche" alt=""/>
        </section>
    );
};

export default GlobalMarketData