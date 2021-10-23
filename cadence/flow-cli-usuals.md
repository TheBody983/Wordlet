-----------------------------------------------TRANSACTIONS-------------------------------------------------

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/MintWOT.tx.cdc 0x1f7da62a915f01c7 1000.0`
> Mine 1000 WOTs via la transaction MintWOT.tx.cdc dans le compte wordlet

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/TransferWOT.tx.cdc 0x5be6fee0409b4842 1000.0`
> Transfert 1000 WOT du compte wordlet vers le compte de Lucas

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/MintWordToken.tx.cdc "yoya" "20000 lieux sous les mers" "inconnu"`
> Mine un mot via la transaction MintWOT.cdc dans le compte signataire (wordlet)

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/TransferWordToken.tx.cdc 0x5be6fee0409b4842 6`
> transfert le WordToken 6 du compte wordlet au compte de Lucas

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/ListTokenForSale.tx.cdc 7 250.0`
> met le token 7 du compte wordlet en vente pour 250 WOT

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/BuyToken.tx.cdc 0x5be6fee0409b4842 5`
> achete le token 1 du marketplace de wordlet

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/DeleteWordToken.tx.cdc 12`
> Supprime le WordToken 11 du compte signataire (wordlet)

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/AddToSellerCatalog.tx.cdc`
> Ajoute le compte wordlet au catalogue des vendeurs

`flow transactions send --network testnet --signer wordlet ./cadence/transactions/RemoveFromSellerCatalog.tx.cdc`
> Retire le compte wordlet du catalogue des vendeurs

-----------------------------------------------SCRIPTS-------------------------------------------------

`flow scripts execute --network testnet ./cadence/scripts/CheckUserWOTBalance.script.cdc 0x1f7da62a915f01c7`
> Affiche le total de WOT sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckUserWordTokens.script.cdc 0x1f7da62a915f01c7`
> Affiche les identifiants de tous les WordTokens presents sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckTokenMetadata.script.cdc 0x1f7da62a915f01c7 6`
> Affiche les metadonnées du WordToken 6 sur le compte Wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckMarketplace.script.cdc 0x1f7da62a915f01c7`
> Affiche le marketplace du compte wordlet

`flow scripts execute --network testnet ./cadence/scripts/GetSellerCatalog.script.cdc`
> Affiche le catalogue de vendeurs inscrit dans le compte wordlet

`flow scripts execute --network testnet ./cadence/scripts/CheckifCataloged.script.cdc 0x1f7da62a915f01c7`
> Affiche si le compte wordlet est inscrit dans le catalogue

-----------------------------------------------ADRESSES-------------------------------------------------

Wordlet : 0x1f7da62a915f01c7
Lucas : 0x5be6fee0409b4842
Damien : 0xfa5995123fa7a207
Ludovic : 0x0741eca75483b285






-----------------------------------------------PROJECT-DEPLOYMENT-------------------------------------------------
`flow project deploy --network testnet --update`