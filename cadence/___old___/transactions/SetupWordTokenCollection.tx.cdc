import WordletContract from 0x1f7da62a915f01c7

/*
v1
Stocke un Wordlet dans le AuthAccount/storage/NFTCollection, 
puis créé une référence /public/NFTReceiver
*/

transaction {
    let address: Address

    prepare (account: AuthAccount){
        self.address = account.address

        if(account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection) == nil){
            account.save<@WordletContract.Collection>(<-WordletContract.createEmptyCollection(), to: /storage/NFTCollection)
        }

        if(!account.getCapability<&WordletContract.Collection{WordletContract.NFTReceiver}>(/public/NFTReceiver).check()){
            account.link<&WordletContract.Collection{WordletContract.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
        }
    }
    post {
        getAccount(self.address).getCapability<&WordletContract.Collection{WordletContract.NFTReceiver}>(/public/NFTReceiver)
            .check():  
            "Problème avec la référence Receiver"    
    }
}