import WordletContract from 0x1f7da62a915f01c7

/*
v1
Créé un Mot avec sa source et son type dans le compte wordlet
*/

transaction (mot: String, source: String, type: String){
    let receiverRef: &{WordletContract.NFTReceiver}
    let minterRef: &WordletContract.NFTMinter

    prepare(acct: AuthAccount) {
        self.receiverRef = acct.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Impossible d'emprunter la référence Reciever")        
        
        self.minterRef = acct.borrow<&WordletContract.NFTMinter>(from: /storage/NFTMinter)
            ?? panic("Impossible d'emprunter la référence Minter")
    }

    execute {
        let metadata : {String : String} = {
            "mot": mot,
            "source": source, 
            "type": type
        }
        let newNFT <- self.minterRef.mintNFT()
    
        self.receiverRef.deposit(token: <-newNFT, metadata: metadata)

        log("NFT Mintée et déposée dans le stockage du compte")
    }
}