export const ADD_TO_SELLER_CATALOG = `
import WOToken, WordletContract, MarketplaceContract from 0x1f7da62a915f01c7

transaction (){

    prepare(account: AuthAccount) {

        //Debut de code a deplacer dans un setup global

        if(account.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale) == nil){
            let receiver = account.getCapability<&{WOToken.Receiver}>(/public/MainReceiver)

            account.save<@MarketplaceContract.SaleCollection>(<-MarketplaceContract.createSaleCollection(ownerVault: receiver), to: /storage/NFTSale)
        }

        if(!account.getCapability<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale).check()){
            account.link<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)
        }

        //Fin

        let wordlet = getAccount(0x1f7da62a915f01c7)
        let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
            .borrow()
            ?? panic("Could not borrow wordlet sales catalog reference")

        wordletCatalogRef.addSeller(sellerAcct: account)

    }
}
`