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
                import PinnieToken from 0xEmulator

                pub fun main(address: Address): UFix64 {
                    let acct1 = getAccount(address)

                    let acct1ReceiverRef = acct1.getCapability<&PinnieToken.Vault{PinnieToken.Balance}>(/public/MainReceiver)
                        .borrow()
                        ?? panic("Could not borrow a reference to the account receiver")

                    log("Balance de ")
                    log(address)
                    log(acct1ReceiverRef.balance)
                    return acct1ReceiverRef.balance
                }
                `,
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ])
            const decoded = await fcl.decode(encoded)
            setBalance(decoded)
            console.log("Balance : " + decoded)
        } catch (error) {
            setBalance(0)

            console.log("No balance")
        }
    };

    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
  
    var verr = 0;
    if(!balance && user.addr){
      fetchBalance(user.addr);
      verr ++;
    }

    return (
    <div>

        balance :
        {balance}
        
        <div>
            <button onClick={() => fetchBalance(user.addr)} className="btn-secondary">Afficher</button>
        </div>

    </div>
    )
}

export default MyBalance;