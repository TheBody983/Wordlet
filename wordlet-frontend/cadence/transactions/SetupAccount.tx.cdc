import WOToken from 0x1f7da62a915f01c7

/*
WIP
*/


transaction {
    // Afin de pouvoir passer l'addresse du prepare au post
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        let vaultA <- WOToken.createEmptyVault()
        
        acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

        log("Vault vide Stocké")

        let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Références créées")

        acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Référence Reciever publique créée")
    }

    post {
        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Référence Reciever du Vault créée incorrectement"

        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():
            "Référence Reciever créée incorrectement"
        
    }
}