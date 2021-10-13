import React from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const createVault = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.transaction(createVaultTx),      
    ])
    await fcl.decode(txId);
    console.log(txId)
}

const linkVault = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.transaction(linkVaultTx),      
    ])
    await fcl.decode(txId);
    console.log(txId)
}

const createWordletCollection = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.transaction(createWordletCollectionTx),      
    ])
    await fcl.decode(txId);
    console.log(txId)
}

const createVaultTx = `
import WOToken from 0x1f7da62a915f01c7

/*
v1
 */
transaction{
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        let vaultA <- WOToken.createEmptyVault()
          
        acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

        log("Vault vide Stocké")

        let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Références créées")
    }

    post {
        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Référence Reciever du Vault créée incorrectement"
    }
}
`

const linkVaultTx = `
import WOToken from 0x1f7da62a915f01c7

transaction {
  prepare(acct: AuthAccount) {
    acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

    log("Référence Reciever publique créée")
  }

  post {
    getAccount(0x1f7da62a915f01c7).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
                    .check():
                    "Référence Reciever créée incorrectement"
    }
}

`

const createWordletCollectionTx = `
import WordletContract from 0x1f7da62a915f01c7

transaction {
    prepare (account: AuthAccount){
        let newCollection <- WordletContract.createEmptyCollection()
        account.save<@WordletContract.Collection>(<-newCollection, to: /storage/NFTCollection)
        let ReceiverRef = account.link<&WordletContract.Collection{WordletContract.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
    }
}
`

const SetupAccount = () => {
    return (
        <div id="setup-account-div">
            <button onClick={() => createVault()}>Create Vault</button>
            <button onClick={() => linkVault()}>Link Vault</button>
            <button onClick={() => createWordletCollection()}>Create Collection</button>
        </div>
    );
}

export default SetupAccount;