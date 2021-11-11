import WordTokenContract from 0x1f7da62a915f01c7

/*
v1
Créé un Mot avec sa source et son type dans le compte wordlet
*/

transaction (word: String, collection: String){
    let receiverRef: &{WordTokenContract.NFTReceiver}
    let minterRef: &WordTokenContract.NFTMinter

    prepare(acct: AuthAccount) {
        self.receiverRef = acct.getCapability<&{WordTokenContract.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Impossible d'emprunter la référence Reciever")        
        
        self.minterRef = acct.borrow<&WordTokenContract.NFTMinter>(from: /storage/NFTMinter)
            ?? panic("Impossible d'emprunter la référence Minter")
    }

    execute {
        let metadata : {String : String} = {}
        
        let newNFT <- self.minterRef.mintNFT(word: word, collection: collection)
    
        self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

        log("NFT Mintée et déposée dans le stockage du compte")
    }
}