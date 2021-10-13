import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import getUserBalance from "./cadence/getUserBalance.script";

const MyBalance = () => {
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        getBalance();
    }, []);
    
    const getBalance = async (address) => {
        try {
            const bal = await getUserBalance(address)
            setBalance(bal)
        }
        catch (error) {
            console.error(error)
        }
    }

    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
  
    if(!balance && user.addr){
        getBalance()
    }

    return (
    <div>
        <div>
            <div>Mon Compte : </div>
            {parseInt(balance, 10).toFixed(2)} WOT
        </div>
        
        <div>
            <button onClick={() => getBalance(user.addr)}>Actualiser</button>
        </div>

    </div>
    )
}

export default MyBalance;