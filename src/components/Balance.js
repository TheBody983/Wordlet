import React from "react";

import { useUser } from "../providers/UserProvider";

const MyBalance = () => {
    const { WOTBalance, getWOTBalance, createWOTVault } = useUser()
    return (
    <div className="balance">
        {WOTBalance!==null?
        <>
            <p>Mon Compte : </p>
            <p>{WOTBalance} WOT</p>
            <button onClick={() => getWOTBalance()}>Actualiser</button>
        </>
        :
            <button onClick={() => createWOTVault()}>Créer un WOT Vault</button>
        }   
    </div>
    )
}

export default MyBalance;