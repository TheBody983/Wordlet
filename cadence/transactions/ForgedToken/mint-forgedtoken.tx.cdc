import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

/*
v1

*/

transaction (wordTokenIds: [UInt64]){
  let collectionRef: &WordTokenContract.Collection
  let receiverRef: &{ForgedTokenContract.ForgedTokenCollectionPublic}
  let minterRef: &{ForgedTokenContract.NFTMinterPublic}

  prepare(acct: AuthAccount) {

    self.collectionRef = acct.borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath)
        ?? panic("Impossible d'emprunter la référence NFTCollection de WordToken")

    self.receiverRef = acct.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)
        .borrow()
        ?? panic("Impossible d'emprunter la référence Reciever de ForgedToken")        

    self.minterRef = acct.getCapability<&{ForgedTokenContract.NFTMinterPublic}>(ForgedTokenContract.MinterPublicPath)
        .borrow()
        ?? panic("Impossible d'emprunter la référence ForgeMinter")

    var wordTokenCollection: @{UInt64: WordTokenContract.NFT} <- self.collectionRef.getWordTokenSubCollection(toForgeIds: wordTokenIds)

    let metadata : {String : String} = {
        "creationDate": "25/12/1985"
    } 
        
    let newNFT <- self.minterRef.mintNFT(smithAcct: acct, toForge: <- wordTokenCollection)

    self.receiverRef.deposit(token: <-newNFT)
  }

  execute {
    
        log("NFT Mintée et déposée dans le stockage du compte")
    }
}
 