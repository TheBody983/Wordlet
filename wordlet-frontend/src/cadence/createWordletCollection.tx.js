//  createWordletCollection.tx.js
//  
//  v1
//  Permet d'initialiser une Collection Wordlet sur le compte courant



import * as fcl from "@onflow/fcl";



const createWordletCollectionTx = `
import WordletContract from 0xWordlet

transaction {
    prepare (account: AuthAccount){
        let newCollection <- WordletContract.createEmptyCollection()
        account.save<@WordletContract.Collection>(<-newCollection, to: /storage/NFTCollection)
        let ReceiverRef = account.link<&WordletContract.Collection{WordletContract.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
    }
}
`



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



export default createWordletCollection