import WOToken from 0x1f7da62a915f01c7

/*
v1
Stocke un WOTVault dans le AuthAccount/storage/MainVault, 
puis créé une référence /public/MainReceiver
*/


transaction {
    // Afin de pouvoir passer l'addresse du prepare au post
    let address: Address

    prepare(account: AuthAccount) {
        self.address = account.address

        //  Stocke un WOTVault dans le storage du compte
        if(account.borrow<&WOToken.Vault>(from: /storage/MainVault) == nil){
            account.save<@WOToken.Vault>(<- WOToken.createEmptyVault(), to: /storage/MainVault)
        }

        //  Créé une référence 
        if(!account.getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver).check()){
            account.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)
        }
    }

    post {
        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Problème avec la référence Receiver"

        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
            .check():
            "Problème avec la référence Balance"        
    }
}