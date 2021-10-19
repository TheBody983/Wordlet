import WOToken from 0x1f7da62a915f01c7

/*
OBSOLETE PRIVILIEGIER LES TX SETUP ETAPE PAR ETAPE
*/


transaction {
    // Afin de pouvoir passer l'addresse du prepare au post
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        //  Stocke un WOTVault dans le storage du compte        
        acct.save<@WOToken.Vault>(<- WOToken.createEmptyVault(), to: /storage/MainVault)

        //  Créé une référence 
        acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)
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