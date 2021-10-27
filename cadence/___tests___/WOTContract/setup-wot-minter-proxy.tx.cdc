import WOTContract from 0x1f7da62a915f01c7

transaction {
    let addr: Address

    prepare(acct: AuthAccount) {
        self.addr = acct.address

        let minterProxy <- WOTContract.createMinterProxy()

        acct.save( <- minterProxy, to: WOTContract.MinterProxyStoragePath)

        acct.link<&WOTContract.MinterProxy{WOTContract.MinterProxyPublic}>(WOTContract.MinterProxyPublicPath, target: WOTContract.MinterProxyStoragePath)
    }

    post {
        getAccount(self.addr).getCapability<&WOTContract.MinterProxy{WOTContract.MinterProxyPublic}>(WOTContract.MinterProxyPublicPath)
            .check():  
            "Référence Publique du Minter créée incorrectement"
    }
}