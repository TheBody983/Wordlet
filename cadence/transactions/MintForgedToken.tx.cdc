import WordletContract, ForgeContract from 0x1f7da62a915f01c7

/*
v1
Créé un Mot avec sa source et son type dans le compte wordlet
*/

transaction (wordTokenIds: [UInt64]){
  let receiverRef: &{ForgeContract.CollectionInterface}
  let collectionRef: &WordletContract.Collection
  let minterRef: &ForgeContract.NFTMinter

  prepare(acct: AuthAccount) {

    self.receiverRef = acct.getCapability<&{ForgeContract.CollectionInterface}>(/public/ForgeCollectionInterface)
        .borrow()
        ?? panic("Impossible d'emprunter la référence Reciever")        

    self.collectionRef = acct.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
        ?? panic("Impossible d'emprunter la référence NFTCollection")

    self.minterRef = acct.borrow<&ForgeContract.NFTMinter>(from: /storage/ForgeMinter)
        ?? panic("Impossible d'emprunter la référence ForgeMinter")

    var wordTokenCollection: @{UInt64: WordletContract.NFT} <- self.collectionRef.getSubCollection(toForgeIds: wordTokenIds)

    let metadata : {String : String} = {
        "mot": "test"
    } 
        
    let newNFT <- self.minterRef.mintNFT(smithAcct: acct, toForge: <- wordTokenCollection)

    self.receiverRef.deposit(token: <-newNFT, metadata: metadata)
  }

  execute {
    
        log("NFT Mintée et déposée dans le stockage du compte")
    }
}
 