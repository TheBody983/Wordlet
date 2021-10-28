export const GET_USER_WORDTOKENS = `
import WordletContract from 0xWordlet

pub fun main(address: Address) : [UInt64] {

// Voir les NFT de address
let nftOwner = getAccount(address)  
let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

let receiverRef = capability.borrow()
    ?? panic("Impossible d'emprunter la Référence Reciever")

return receiverRef.getIDs()
}
`
