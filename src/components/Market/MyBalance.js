import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

import getUserBalance from "../../cadence/getUserBalance.script";
import { useAuth } from "../../providers/AuthProvider";
import { useUser } from "../../providers/UserProvider";

const MyBalance = () => {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance } = useUser

        
    console.log(getWOTBalance)
    console.log(WOTBalance)

    const [balance, setBalance] = useState(null);
    useEffect(() => {
        try{ getBalance();}
        catch(e){}
    }, []);
    
    const getBalance = async () => {
        try {
            const bal = await getUserBalance(user?.addr)
            setBalance(bal)
        }
        catch (error) {
            console.error(error)
        }
    }
    
    if(!balance && user?.addr){
        getBalance()
    }

    return (
    <div className="balance">
        <p>Mon Compte : </p>
        <p>{parseInt(balance, 10).toFixed(2)} WOT</p>
        <div>
            <button onClick={() => getBalance()}>Actualiser</button>
        </div>

    </div>
    )
}

export default MyBalance;