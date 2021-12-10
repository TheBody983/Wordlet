import WordTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction (mot: String, collection: String, value: UFix64) {

	prepare(acct: AuthAccount) {

		let collectionRef = acct.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow()
			?? panic("Impossible d'emprunter la Référence CollectionPublic")

		let minterRef = acct.borrow<&WordTokenContract.NFTMinter>(from: WordTokenContract.MinterStoragePath)
			?? panic("Impossible d'emprunter la Référence Minter")

		let sale = acct.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
			?? panic("Impossible d'emprunter la ressource de vente")

		let newNFT <- minterRef.mintNFT(word: mot, collection: collection)

		sale.listForSale(token: <- newNFT, price: value)
	}

}