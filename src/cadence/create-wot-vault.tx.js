export const CREATE_WOT_VAULT = `
import WOToken from 0xWordlet

transaction{
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        let vaultA <- WOToken.createEmptyVault()
    
        acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

        log("Vault vide Stocké")

        let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Références créées")
    }

    post {
        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Référence Reciever du Vault créée incorrectement"
    }
}
`