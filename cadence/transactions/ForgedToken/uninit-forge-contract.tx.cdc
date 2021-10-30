import ForgeContract from 0x1f7da62a915f01c7

/*
 creer au compte signataire le catalogue de vendeur
 */

transaction (){

    prepare(account: AuthAccount) {

        let ForgeCollection <- account.load<@ForgeContract.Collection>(from: /storage/ForgeCollection)
        destroy ForgeCollection

        account.unlink(/public/ForgeCollectionInterface)
        

        let SellerList <- account.load<@ForgeContract.NFTMinter>(from: /storage/ForgeMinter)
        destroy SellerList

        account.unlink(/public/ForgeMinterInterface)

    }
}