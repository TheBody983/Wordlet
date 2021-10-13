import WOToken from 0x1f7da62a915f01c7

transaction (addr: Address){
    prepare(acct: AuthAccount) {
        let vaultA <- WOToken.createEmptyVault()
          
        acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

        log("Vault vide Stocké")

        let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Références créées")
    }

    post {
        getAccount(addr).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Référence Reciever du Vault créée incorrectement"
    }
}