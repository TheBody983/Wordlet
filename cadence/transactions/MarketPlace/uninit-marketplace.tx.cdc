
import MarketplaceContract002 from 0x1f7da62a915f01c7

/*
 creer au compte signataire le catalogue de vendeur
 */

transaction (){

    prepare(account: AuthAccount) {

        let SaleCollection <- account.load<@MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
        destroy SaleCollection

        account.unlink(MarketplaceContract002.SaleCollectionPublicPath)
        

        let SellerList <- account.load<@MarketplaceContract002.SellerList>(from: MarketplaceContract002.SellerListStoragePath)
        destroy SellerList

        account.unlink(MarketplaceContract002.SellerListPublicPath)

    }
}