# Renomme la fenêtre Flow CLI
$host.UI.RawUI.WindowTitle = "Flow CLI"

flow accounts create --key=bbb3f57cf5e7a56a84cdd5895126cef873d36fbc6c5e959a9c3c0f8f9dec8becf0c2d4afdc37a087a885f83deeb19ccf128968e57a357c481e1c213a3e0d00cd

# Deploie les contrats selon le flow.json
flow accounts add-contract PinataPartyContract ./cadence/contracts/PinataPartyContract.cdc
flow accounts add-contract PinnieToken ./cadence/contracts/PinnieToken.cdc
flow accounts add-contract MarketplaceContract ./cadence/contracts/MarketPlaceContract.cdc

# Cree la NFT defaut "Wordlet"
flow transactions send .\cadence\transactions\MintPinataParty.cdc
flow transactions send .\cadence\transactions\MintPinataParty2.cdc --arg String:"Bonjour" --arg String:"Original" --arg String:"Nom Commun"
flow transactions send .\cadence\transactions\MintPinataParty2.cdc --arg String:"Investir" --arg String:"Pere Riche Pere Pauvre" --arg String:"Verbe"
flow transactions send .\cadence\transactions\MintPinataParty2.cdc --arg String:"Abri" --arg String:"Ma Mamie" --arg String:"Nom Commun"

# Cree la reference pour les pinnies sur le emulator account
flow transactions send .\cadence\transactions\LinkPinnie.cdc

# Mint des pinnies
flow transactions send .\cadence\transactions\MintPinnie.cdc --signer emulator-account

# Vérifier le balance avec 
# flow scripts execute .\cadence\scripts/CheckPinnieBalance.cdc

# Créé un Vault pour le deuxieme utilisateur
flow transactions send ./cadence/transactions/CreateEmptyPinnieVault.cdc --signer second-account

# Créé une interface reciever pour les pinnies
flow transactions send ./cadence/transactions/LinkPinnie.cdc --signer second-account