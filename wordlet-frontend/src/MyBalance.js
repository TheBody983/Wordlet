import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const MyBalance = () => {
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        fetchBalance();
      }, []);
    const fetchBalance = async (address) => {
        try {
            const encoded = await fcl.send([
                fcl.script`
                import WOToken from 0x1f7da62a915f01c7

                pub fun main(address: Address): UFix64 {
                    let account = getAccount(address)

                    let accountReceiverRef = account.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
                        .borrow()
                        ?? panic("Impossible d'emprunter la Référence Reciever")

                    return accountReceiverRef.balance
                }
                `,
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ])
            const decoded = await fcl.decode(encoded)
            setBalance(decoded)
            console.log("MyBalance : " + decoded)
        } catch (error) {
            setBalance(0)
            console.error(error)

            console.log("MyBalance : No balance")
        }
    };

    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
  
    if(!balance && user.addr){
      fetchBalance(user.addr);
    }

    return (
    <div>
        <div>
            <div>Mon Compte : </div>
            {balance} WOT
        </div>
        
        <div>
            <button onClick={() => fetchBalance(user.addr)}>Actualiser</button>
        </div>

    </div>
    )
}

export default MyBalance;