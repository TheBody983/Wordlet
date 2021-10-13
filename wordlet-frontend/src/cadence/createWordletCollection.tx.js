import * as fcl from "@onflow/fcl";

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

export default createWordletCollection