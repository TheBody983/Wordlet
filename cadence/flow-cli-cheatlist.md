# Flow CLI Cheatlist

## Executer un Script
`flow scripts execute [-flag] PATH [args]` 

Exemple :
`flow scripts execute --network testnet ./cadence/scripts/UserAccountIsInitiated.cdc 0x1f7da62a915f01c7` 
> Vérifie si un compte est prêt à utiliser Wordlet grâce au script UserAccountIsInitiated.cdc

## Envoyer une Transaction
`flow transactions send [-flag] PATH [args]` 

Exemple :
`flow transactions send --network testnet --signer wordlet ./cadence/transactions/MintWOT.tx.cdc 1000`
> Mine des WOT grace à la transaction MintWOT.cdc

## Consulter une Transaction
`flow transactions get [-flag] TXID`

Exemple :
`flow transactions get --network testnet d9612e16b1ef41d1e7644f2e6c0d1f00a89a5b9f0e7345cb9607577d4d1f4ed8`
> Consulte la transaction d9612e16b1ef41d1e7644f2e6c0d1f00a89a5b9f0e7345cb9607577d4d1f4ed8

## Choix des Flags
`--network testnet` : précise que la requête se fait sur le testnet (defaut: emulator)

`--signer wordlet` : pour toutes les transactions "admin" vu que le compte à une ref minter