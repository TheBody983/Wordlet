-----------------------------------------------TRANSACTIONS-------------------------------------------------

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/General/setup-account.tx.cdc`
> Setup le compte signataire (WordToken)

`flow transactions send --network testnet --signer wordlet ./cadence/WOT/transactions/mint-wot.tx.cdc 1000.0`
> Mine 1000 WOTs via la transaction MintWOT.tx.cdc dans le compte wordlet

`flow transactions send --network testnet --signer wordlet ./cadence/WOT/transactions/transfer-wot.tx.cdc 0x5be6fee0409b4842 1000.0`
> Transfert 1000 WOT du compte wordlet vers le compte de Lucas

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/WordToken/mint-wordtoken.tx.cdc "yoya" "20000 lieux sous les mers"`
> Mine un mot via la transaction MintWOT.cdc dans le compte signataire (wordlet)

`flow transactions send --network testnet --signer wordlet ./cadence/WordToken/transactions/transfer-wordtoken.tx.cdc 0x5be6fee0409b4842 6`
> transfert le WordToken 6 du compte wordlet au compte de Lucas

`flow transactions send --network testnet --signer wordlet ./cadence/Marketplace/transactions/list-token-for-sale.tx.cdc 7 250.0`
> met le token 7 du compte wordlet en vente pour 250 WOT

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/BuyToken.tx.cdc 0x5be6fee0409b4842 5`
> achete le token 1 du marketplace de wordlet

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/DeleteWordToken.tx.cdc 12`
> Supprime le WordToken 11 du compte signataire (wordlet)

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/AddToSellerCatalog.tx.cdc`
> Ajoute le compte wordlet au catalogue des vendeurs

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/RemoveFromSellerCatalog.tx.cdc`
> Retire le compte wordlet du catalogue des vendeurs

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/ForgedToken/mint-forgedtoken.tx.cdc [5,4]`
> Créer un ForgedToken a partir des WordTokens 20 et 21

-----------------------------------------------SCRIPTS-------------------------------------------------

`flow scripts execute --network testnet ./cadence/scripts/WOT/get-wot-balance.script.cdc 0x1f7da62a915f01c7`
> Affiche le total de WOT sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/WordToken/get-wordtoken-collection.script.cdc 0x1f7da62a915f01c7`
> Affiche les identifiants de tous les WordTokens presents sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/WordToken/get-wordtoken-data.script.cdc 0x1f7da62a915f01c7 6`
> Affiche les metadonnées du WordToken 6 sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckMarketplace.script.cdc 0x1f7da62a915f01c7`
> Affiche le marketplace du compte wordlet

`flow scripts execute --network testnet ./cadence/scripts/GetSellerCatalog.script.cdc`
> Affiche le catalogue de vendeurs inscrit dans le compte wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckifCataloged.script.cdc 0x1f7da62a915f01c7`
> Affiche si le compte wordlet est inscrit dans le catalogue

`flow scripts execute --network testnet ./cadence/scripts/ForgedToken/get-user-forgedtokens.script.cdc 0x1f7da62a915f01c7`
> Affiche les identifiants de tous les ForgedTokens presents sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/ForgedToken/get-forgedtoken-smith.script.cdc 0x1f7da62a915f01c7 1`
> Affiche les metadonnées du ForgedToken 1 sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/ForgedToken/get-forgedtoken-wt.script.cdc --arg Address:0x1f7da62a915f01c7 --arg UInt64:1`
> Affiche les données des tokens compris dans le ForgedToken ciblé
------------------⚠️ DEPRECATION WARNING---------------------


-----------------------------------------------ADRESSES-------------------------------------------------

Wordlet : 0x1f7da62a915f01c7
Lucas : 0x5be6fee0409b4842
Damien : 0xfa5995123fa7a207
Ludovic : 0x0741eca75483b285







-----------------------------------------------PROJECT-DEPLOYMENT-------------------------------------------------
`flow project deploy --network testnet --update`

`flow accounts add-contract ForgedTokenContract ./cadence/contracts/ForgedTokenContract.cdc --network testnet --signer wordlet`
`flow accounts update-contract ForgedTokenContract ./cadence/contracts/ForgedTokenContract.cdc --network testnet --signer wordlet`
`flow accounts remove-contract ForgedTokenContract --network testnet --signer wordlet`