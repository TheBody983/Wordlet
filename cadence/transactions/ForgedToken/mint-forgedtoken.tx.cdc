import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

/*
v1

*/

transaction (wordTokenIds: [UInt64]){
  let collectionRef: &WordTokenContract.Collection
  let receiverRef: &{ForgedTokenContract.ForgedTokenCollectionPublic}
  let minterRef: &{ForgedTokenContract.NFTMinterPublic}

  prepare(authAcct: AuthAccount) {

        let wordletAccount = getAccount(0x1f7da62a915f01c7)

        self.collectionRef = authAcct.borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence NFTCollection de WordToken")

        self.receiverRef = authAcct.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence Reciever de ForgedToken")        

        self.minterRef = wordletAccount.getCapability<&{ForgedTokenContract.NFTMinterPublic}>(ForgedTokenContract.MinterPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence ForgeMinter")

        let wordTokenCollection: @{UInt64: WordTokenContract.NFT} <- self.collectionRef.getWordTokenSubCollection(toForgeIds: wordTokenIds)

        let newNFT <- self.minterRef.mintNFT(smithAcct: authAcct, toForge: <- wordTokenCollection)

        self.receiverRef.deposit(token: <-newNFT)

        log("NFT Mintée et déposée dans le stockage du compte")
            
    }
}
 