import WOToken from 0x1f7da62a915f01c7

transaction {
  prepare(acct: AuthAccount) {
    acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

    log("Référence Reciever publique créée")
  }

  post {
    getAccount(0x1f7da62a915f01c7).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
                    .check():
                    "Référence Reciever créée incorrectement"
    }
}
