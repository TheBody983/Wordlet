import WOTContract from 0x1f7da62a915f01c7

transaction {

    let resourceStoragePath: StoragePath
    let capabilityPrivatePath: CapabilityPath
    let minterCapability: Capability<&WOTContract.Minter>

    let addr: Address

    prepare(adminAccount: AuthAccount) {
        self.addr = adminAccount.address

        self.resourceStoragePath = /storage/wot_minter_01
        self.capabilityPrivatePath = /private/wot_minter_01

        let tokenAdmin = adminAccount.borrow<&WOTContract.Administrator>(from: WOTContract.AdminStoragePath)
            ?? panic("Impossible d'emprunter la référence à la ressource Admin")

        let minter <- tokenAdmin.createNewMinter()
        adminAccount.save( <- minter, to: self.resourceStoragePath)
        self.minterCapability = adminAccount.link<&WOTContract.Minter>(
            self.capabilityPrivatePath,
            target: self.resourceStoragePath
        ) ?? panic("Impossible de lier le Minter")
    }

    execute {
        let acct = getAccount(self.addr)

        let capabilityReceiver = acct.getCapability
            <&WOTContract.MinterProxy{WOTContract.MinterProxyPublic}>
            (WOTContract.MinterProxyPublicPath)!
            .borrow() ?? panic("Impossible d'emprunter la Référence Receiver")

        capabilityReceiver.setMinterCapability(cap: self.minterCapability)
    }
}