# Renomme la fenêtre Flow CLI
$host.UI.RawUI.WindowTitle = "Flow CLI"

# flow accounts create --key=”2070dcdfd5660eb031a9c887547df5abe606c3e6d4550a1d2bdd5235372cde829b3acd2809044819c6f16bfbfafbe941f2fa3b26f1dab848df954957cc976521”

# Deploie les contrats selon le flow.json
flow project deploy

# Deploie le contrat Pinata
flow accounts add-contract PinataPartyContract .\cadence\contracts\PinataPartyContract.cdc

# Cree la NFC defaut "white people at the gym"
flow transactions send .\cadence\transactions\MintPinataParty.cdc