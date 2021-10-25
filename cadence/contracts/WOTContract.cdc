import FungibleToken from 0x9a0766d93b6608b7;

// Shameless FUSD clone
// WOTContract implémente l'interface officielle FungibleToken
// Ce qui impose tout ce qui est préfixé FT
// Ajoute aussi des vérifications pre (avant l'éxecution)
// et des vérifications post (après l'écxecution)
pub contract WOTContract: FungibleToken {

    // FT - Event emis lors de la création du Contrat
    pub event TokensInitialized(initialSupply: UFix64)

    // FT - Event émis lors d'un retrait de Tokens
    pub event TokensWithdrawn(amount: UFix64, from: Address?)

    // FT - Event émis lors d'un dépôt de Tokens
    pub event TokensDeposited(amount: UFix64, to: Address?)

    // Event émis lorsque des Tokens sont mintés
    pub event TokensMinted(amount: UFix64)

    pub event TokensBurned(amount: UFix64)

    // Event émis lors de la création d'une Ressource Minter
    pub event MinterCreated()

    // Chemin vers la Ressource Admin
    pub let AdminStoragePath: StoragePath

    pub let VaultStoragePath: StoragePath

    pub let ReceiverPublicPath: PublicPath

    // Chemin vers le MinterProxy
    pub let MinterProxyStoragePath: StoragePath

    // Chemin public vers la Capability MinterProxy
    pub let MinterProxyPublicPath: StoragePath

    // Quantité de Tokens en existence
    pub var totalSupply: UFix64

    // Vault est une Ressource qui permet de stocker le solde de WOT d'un utilisateur
    // FT - Vault est une ressource qui implémente les interfaces :
    //  FT - Provider : withdraw
    //  FT - Receiver : deposit
    //  FT - Balance : balance
    pub resource Vault: FungibleToken.Provider, FungibleToken.Receiver, FungibleToken.Balance {

        // FT - Le solde de WOT de l'utilisateur
        pub var balance: UFix64

        // FT - Initialise le solde d'un compte à la création de la Ressource
        init(balance: UFix64){
            self.balance = balance
        }

        // FT - withdraw (retrait) emits TokensWithdrawn
        //
        // Fonction qui prend un Nombre en paramètre
        // puis retire ce montant du Vault
        // FT - pre: Vérifie que le Vault à bien le montant suffisant
        // Créé un Vault temporaire qui stocke
        // ce montant
        // FT - post: Vérifie que le Vault contient bien 
        // la différence entre son ancien solde et le montant du retrait
        // Retourne le Vault ainsi créé
        pub fun withdraw(amount: UFix64): @FungibleToken.Vault {
            self.balance = self.balance - amount
            emit TokensWithdrawn(amount: amount, from: self.owner?.address)
            return <- create Vault(balance: amount)
        }

        // FT - deposit (dépôt) emits TokensDeposited
        //
        // Fonction qui prend un Vault en paramètre
        // puis ajoute son solde au solde du Vault du propriétaire
        // FT - pre: Vérifie si les Vaults sont compatibles (du même type)
        // Ajoute le montant du Vault paramètre au Vault propriétaire
        // puis supprime le Vault vide
        // FT - post: Vérifie que le nouveau solde est bien égal
        // à la somme de l'ancien solde et du solde du Vault paramètre
        // Ne retourne rien
        pub fun deposit(from: @FungibleToken.Vault) {
            let vault <- from as! @WOTContract.Vault
            self.balance = self.balance + vault.balance
            emit TokensDeposited(amount: vault.balance, to: self.owner?.address)
            vault.balance = 0.0
            destroy vault
        }

        // Lors de le destruction d'un Vault,
        // retire son solde du montant total en circulation
        destroy() {
            WOTContract.totalSupply = WOTContract.totalSupply - self.balance
            if(self.balance > 0.0) {
                emit TokensBurned(amount: self.balance)
            }
        }
    }

    // FT - createEmptyVault
    //
    // Fonction qui créé un nouveau Vault
    // avec un solde de 0 WOT
    // FT - post: Vérifie que le montant est bien égal à zéro
    // Retourne ce Vault
    pub fun createEmptyVault(): @WOTContract.Vault {
        return <- create Vault(balance: 0.0)
    }

    // Minter
    //
    // Ressource permettant de minter des nouveaux WOT
    // L'admin stocke cette ressource et le partage via une Capability
    pub resource Minter {

        // mintTokens emits TokensMinted
        //
        // Fonction qui mint de nouveaux tokens,
        // les ajoute au montant total,
        // et retourne un Vault les contenant
        pub fun mintTokens(amount: UFix64): @WOTContract.Vault {
            pre { 
                amount > 0.0: "Le montant à minter doit être supérieur à zéro"
            }
            WOTContract.totalSupply = WOTContract.totalSupply + amount
            emit TokensMinted(amount: amount)
            return <- create Vault(balance: amount)
        }
    }

    pub resource interface MinterProxyPublic {
        pub fun setMinterCapability(cap: Capability<&Minter>)
    }

    // MinterProxy
    //
    // Ressource contenant la Capability servant à mint des tokens
    // La ressource que cette Capability représente peut être supprimée par l'admin
    // pour révoquer unilatéralement la Capability de mint si besoin
    pub resource MinterProxy: MinterProxyPublic {

        //access(self) permet que personne ne puisse copier la Capability
        access(self) var minterCapability: Capability<&Minter>?

        // Tout le monde peut appeler ça, mais seul l'admin peut créer une Minter Capability,
        // alors le système de type oblige la fonction à être appelée par un admin
        pub fun setMinterCapability(cap: Capability<&Minter>) {
            self.minterCapability = cap
        }

        pub fun mintTokens(amount: UFix64): @WOTContract.Vault {
            return <- self.minterCapability!
                .borrow()!
                .mintTokens(amount: amount)
        }

        init() {
            self.minterCapability = nil
        }
    }

    // createMinterProxy
    //
    // Fonction qui créé une Resource MinterProxy
    // Tout le monde peut appeler la fonction, 
    // mais il ne peut pas minter sans Minter Capability
    // et seul un admin peut en créer
    pub fun createMinterProxy(): @MinterProxy {
        return <- create MinterProxy()
    }

    // Administrator
    // 
    // Une ressource qui permet la création de nouveaux Minters
    //
    // Pour l'instant on a besoin que d'un Minter, mais on ne sait jamais
    pub ressource Administrator {

        // createNewMinter emits MinterCreated
        //
        // Fonction qui créé une Ressource Minter,
        // retourne le Minter
        pub fun createNewMinter(): @Minter {
            emit MinterCreated()
            return <- create Minter()
        }

    }

    init() {
        self.AdminStoragePath = /storage/wotAdmin
        self.MinterProxyPublicPath = /public/wotMinterProxy
        self.MinterProxyStoragePath = /storage/wotMinterProxy

        self.totalSupply = 0.0

        let admin <- create Administrator()
        self.account.save(<-admin, to: self.AdminStoragePath)

        // Emet un Event pour signaler que le contrat est déployé
        emit TokensInitialized(initialSupply: 0.0)
    }
}