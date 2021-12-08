import React, { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";

import WordToken from "./WordToken";
import Balance from './Balance';

const UserMarket = () => {
    const { getUserSalelist} = useUser( "0x1f7da62a915f01c7" )

    const [userSalelist, setUserSalelist] = useState([])
    const [address] = useState("0x1f7da62a915f01c7")

    useEffect(() => {
        getUserSalelist (address, setUserSalelist)
    }, [address, getUserSalelist])

    return (
        
        <section id="marche">
            <h2> Marché de <input type="text" placeholder={address} onChange={e=>{setUserSalelist([]); getUserSalelist(e.target.value ,setUserSalelist)}}/></h2>
            <div className="market-listings">
            {userSalelist?.map(token => {
                return (
                    <WordToken market key={token.id} tokenId={token.id} seller={token.seller}/>
                )
            })
            }
            </div>
            <Balance />
            <img src="marche.png" id="marche" alt=""/>
        </section>
    );
};

export default UserMarket