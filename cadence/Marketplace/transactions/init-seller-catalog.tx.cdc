import MarketplaceContract from 0x1f7da62a915f01c7

/*
 creer au compte signataire le catalogue de vendeur
 */

transaction (){

    prepare(account: AuthAccount) {

        let SellerList <- account.load<@MarketplaceContract.SellerList>(from: /storage/SellerList)
        destroy SellerList

        account.unlink(/public/SellerCatalog)

        account.save<@MarketplaceContract.SellerList>(<-MarketplaceContract.createSellerList(), to: /storage/SellerList)
        account.link<&MarketplaceContract.SellerList{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog, target: /storage/SellerList)



    }
}