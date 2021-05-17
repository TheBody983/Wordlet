
import PinataPartyContract from 0xf8d6e0586b0a20c7
import PinnieToken from 0xf8d6e0586b0a20c7
import MarketplaceContract from 0xf8d6e0586b0a20c7

transaction (tokenId: UInt64, value: UFix64){

    prepare(acct: AuthAccount) {
        let receiver = acct.getCapability<&{PinnieToken.Receiver}>(/public/MainReceiver)
        let sale <- MarketplaceContract.createSaleCollection(ownerVault: receiver)

        let collectionRef = acct.borrow<&PinataPartyContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Could not borrow owner's nft collection reference")

        let token <- collectionRef.withdraw(withdrawID: tokenId)

        sale.listForSale(token: <-token, price: value)

        acct.save(<-sale, to: /storage/NFTSale)

        acct.link<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)

        //log("Vente du NFT ".concat(tokenId).concat(" pour ").concat(value).concat("jetons"))
    }
}