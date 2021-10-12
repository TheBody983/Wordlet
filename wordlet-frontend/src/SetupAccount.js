import React from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const setupAccount = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.args([
    ]),
    fcl.transaction`
    import WOToken from 0x1f7da62a915f01c7

    transaction {
        // Afin de pouvoir passer l'addresse du prepare au post
        let address: Address

        prepare(acct: AuthAccount) {
            self.address = acct.address

            let vaultA <- WOToken.createEmptyVault()
            
            acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

            log("Vault vide Stocké")

            let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

            log("Références créées")

            acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

            log("Référence Reciever publique créée")
        }

        post {
            getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
                .check():  
                "Référence Reciever du Vault créée incorrectement"

            getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
                .check():
                "Référence Reciever créée incorrectement"
            
        }
    }
    `,      
    ])
    await fcl.decode(txId);
    console.log(txId)
}

const SetupAccount = () => {
    return (
        <div className="setup-account-btn">
            <button onClick={() => SetupAccount()} className="btn-primary">Setup Account</button>
        </div>
    );
}

export default SetupAccount;