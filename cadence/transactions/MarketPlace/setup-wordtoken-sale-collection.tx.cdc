import MarketplaceContract, WOToken from 0x1f7da62a915f01c7

/*
v1
Stocke un saleCollection dans le AuthAccount/storage/NFTSale, 
puis créé une référence /public/NFTSale
*/

transaction {
    let address: Address

    prepare (account: AuthAccount){
        self.address = account.address

        if(account.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale) == nil){
            let receiver = account.getCapability<&{WOToken.Receiver}>(/public/MainReceiver)

            account.save<@MarketplaceContract.SaleCollection>(<-MarketplaceContract.createSaleCollection(ownerVault: receiver), to: /storage/NFTSale)
        }

        if(!account.getCapability<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale).check()){
            account.link<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)
        }
    }
    post {
        getAccount(self.address).getCapability<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale)
            .check():  
            "Problème avec la référence Receiver"    
    }
}