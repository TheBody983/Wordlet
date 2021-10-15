import WOToken from 0x1f7da62a915f01c7

/*
v1

Envoie des WOT du compte Wordlet à un compte passé en paramètre
*/

transaction (address: Address){
  var temporaryVault: @WOToken.Vault

  prepare(acct: AuthAccount) {
    let vaultRef = acct.borrow<&WOToken.Vault>(from: /storage/MainVault)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: 500.0)
  }

  execute {
    let recipient = getAccount(address)

    let receiverRef = recipient.getCapability(/public/MainReceiver)
                      .borrow<&WOToken.Vault{WOToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

    receiverRef.deposit(from: <-self.temporaryVault)

    log("Transfer succeeded!")
  }
}