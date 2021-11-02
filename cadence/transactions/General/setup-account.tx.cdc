import WOTContract, WordTokenContract, ForgedTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

/*
v1
Initialise un compte aux contrats WOTContract, WordTokenContract, ForgedTokenContract, MarketplaceContract
*/

transaction {
    let address: Address

    prepare (account: AuthAccount){
        self.address = account.address


        //SETUP WOT v2

        if(account.borrow<&WOTContract.Vault>(from: WOTContract.VaultStoragePath) == nil){
            account.save<@WOTContract.Vault>(<- WOTContract.createEmptyVault(), to: WOTContract.VaultStoragePath)
        }

        if(!account.getCapability<&WOTContract.Vault{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath).check()){
            account.link<&WOTContract.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(WOTContract.ReceiverPublicPath, target: WOTContract.VaultStoragePath)
        }

        //SETUP WORDTOKEN v2

        if(account.borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath) == nil){
            account.save<@WordTokenContract.Collection>(<-WordTokenContract.createEmptyCollection(), to: WordTokenContract.CollectionStoragePath)
        }

        if(!account.getCapability<&WordTokenContract.Collection{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).check()){
            account.link<&WordTokenContract.Collection{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath, target: WordTokenContract.CollectionStoragePath)
        }

        //SETUP FORGEDTOKEN v2

        if(account.borrow<&ForgedTokenContract.Collection>(from: ForgedTokenContract.CollectionStoragePath) == nil){
            account.save<@ForgedTokenContract.Collection>(<-ForgedTokenContract.createEmptyCollection(), to: ForgedTokenContract.CollectionStoragePath)
        }

        if(!account.getCapability<&ForgedTokenContract.Collection{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath).check()){
            account.link<&ForgedTokenContract.Collection{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath, target: ForgedTokenContract.CollectionStoragePath)
        }

        //SETUP MARKETPLACE v1

        if(account.borrow<&MarketplaceContract002.SaleCollection>(from: /storage/NFTSale002) == nil){
            let receiver = account.getCapability<&{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
            account.save<@MarketplaceContract002.SaleCollection>(<-MarketplaceContract002.createSaleCollection(ownerVault: receiver), to: /storage/NFTSale002)
        }

        if(!account.getCapability<&MarketplaceContract002.SaleCollection{MarketplaceContract002.SalePublic}>(/public/NFTSale002).check()){
            account.link<&MarketplaceContract002.SaleCollection{MarketplaceContract002.SalePublic}>(/public/NFTSale002, target: /storage/NFTSale002)
        }


    }
    post {

        getAccount(self.address).getCapability<&WOTContract.Vault{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
            .check():  
            "Problème avec la référence Receiver de WOT"

        getAccount(self.address).getCapability<&WOTContract.Vault{FungibleToken.Balance}>(WOTContract.ReceiverPublicPath)
            .check():
            "Problème avec la référence Balance de WOT"     

        getAccount(self.address).getCapability<&WordTokenContract.Collection{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)
            .check():  
            "Problème avec la référence Receiver de WordToken"  

        getAccount(self.address).getCapability<&ForgedTokenContract.Collection{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)
            .check():  
            "Problème avec la référence Receiver de ForgedToken" 
        
    }
}