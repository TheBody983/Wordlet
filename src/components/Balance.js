import React from "react";

import { useUser } from "../providers/UserProvider";

const MyBalance = () => {
    const { WOTBalance, getWOTBalance } = useUser()
    return (
    <div className="balance">
        {WOTBalance!==null?
        <>
            <p>Mon Compte : </p>
            <p>{WOTBalance} WOT</p>
            <button onClick={() => getWOTBalance()}>Actualiser</button>
        </>
        :
            <label>WOT Vault non initialisé</label>
        }   
    </div>
    )
}

export default MyBalance;