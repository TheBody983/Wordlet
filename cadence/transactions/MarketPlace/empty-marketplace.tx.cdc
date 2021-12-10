import WOTContract, MarketplaceContract002 from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7


transaction (){

    prepare(account: AuthAccount) {

        let SaleCollection <- account.load<@MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
        destroy SaleCollection

        account.unlink(MarketplaceContract002.SaleCollectionPublicPath)
        

		if(account.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath) == nil){
            let receiver = account.getCapability<&{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
            account.save<@MarketplaceContract002.SaleCollection>(<-MarketplaceContract002.createSaleCollection(ownerVault: receiver), to: MarketplaceContract002.SaleCollectionStoragePath)
        }

        if(!account.getCapability<&MarketplaceContract002.SaleCollection{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath).check()){
            account.link<&MarketplaceContract002.SaleCollection{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath, target: MarketplaceContract002.SaleCollectionStoragePath)
        }

    }
}