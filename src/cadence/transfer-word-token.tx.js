//  transferWordToken.tx.js
//
//  v1
//  Envoie une transation signée de l'utilisateur courant


import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"


export const TRANSFER_WORD_TOKEN = `
import WordletContract from 0xWordlet

/*
Transfère un NFT du signataire au compte dont l'adresse est passé en paramètre
 */

transaction (address: Address, tokenId: UInt64){

    let collection: @WordletContract.Collection
    let metadata: {String: String}

    prepare(account: AuthAccount) {

        self.collection <- WordletContract.createEmptyCollection()

        let collectionRef = account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence à la Collection du propriétaire")

        self.metadata = collectionRef.getMetadata(id: tokenId)

        self.collection.deposit(token: <- collectionRef.withdraw(withdrawID: tokenId), metadata: self.metadata)
    }

    execute {

        let recepteur = getAccount(address)

        let receiverRef = recepteur.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Impossible d'emprunter la référence Receiver")

        receiverRef.deposit(token: <-self.collection.withdraw(withdrawID: tokenId), metadata: self.metadata)

        destroy self.collection

        log("Transfer effectué")
    }

}
`