import WOTContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7;

transaction {
    let addr: Address

    prepare(acct: AuthAccount) {
        self.addr = acct.address

        let vaultA <- WOTContract.createEmptyVault()
        
        acct.save<@WOTContract.Vault>(<-vaultA, to: WOTContract.VaultStoragePath)

        acct.link<&WOTContract.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(WOTContract.ReceiverPublicPath, target: WOTContract.VaultStoragePath)
    }

    post {
        getAccount(self.addr).getCapability<&WOTContract.Vault{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
            .check():  
            "Référence Reciever du Vault créée incorrectement"
    }
}