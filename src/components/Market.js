import React from "react";

import { useAuth } from "../providers/AuthProvider";
import { useUser } from "../providers/UserProvider";

import WordToken from "./WordToken";
import Balance from './Balance';
import { Link } from "react-router-dom";

const GlobalMarketData = () => {
    const { user } = useAuth( )
    const { marketListings, getMarketListings} = useUser( user )

    return (
        <section id="marche">
            <h2> Marché </h2>
            <Link to={"/userMarket"}>user market</Link>
            <div className="market-listings">
            {marketListings?.map(token => {
                return (
                    <WordToken market key={token.id} tokenId={token.id} seller={token.seller}/>
                )
            })
            }
            <button onClick={()=>getMarketListings()}>Rafraîchir</button>
            </div>
            <Balance />
            <img src="marche.png" id="marche" alt=""/>
        </section>
    );
};

export default GlobalMarketData