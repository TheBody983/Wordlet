# Deploie les contrats selon le flow.json
flow accounts add-contract PinataPartyContract ./contracts/PinataPartyContract.cdc
flow accounts add-contract PinnieToken ./contracts/PinnieToken.cdc
flow accounts add-contract MarketplaceContract ./contracts/MarketPlaceContract.cdc
# Cree la NFT defaut "Wordlet"
flow transactions send ./cadence/transactions/MintPinataParty.cdc
flow transactions send ./cadence/transactions/MintPinataParty2.cdc --arg String:"Bonjour" --arg String:"Original" --arg String:"Nom Commun"
flow transactions send ./cadence/transactions/MintPinataParty2.cdc --arg String:"Investir" --arg String:"Pere Riche Pere Pauvre" --arg String:"Verbe"
flow transactions send ./cadence/transactions/MintPinataParty2.cdc --arg String:"Abri" --arg String:"Ma Mamie" --arg String:"Nom Commun"
# Cree la reference pour les pinnies sur le emulator account
flow transactions send ./cadence/transactions/LinkPinnie.cdc
# Mint des pinnies
flow transactions send ./cadence/transactions/MintPinnie.cdc --signer emulator-account