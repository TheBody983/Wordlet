import React from "react"

const Header = () => {
    return (
        <header>
            <ul>
                <li><a href="#accueil" id="btnaccueil" class="active">Accueil</a></li>
                <li><a href="#marche" id="btnmarche">Marché</a></li>
                <li><a href="#collection" id="btncollection">Collection</a></li>
                <li><a href="#jeux" id="btnjeux">Jeux</a></li>
                <li><a href="#apropos" id="btnpropos">À propos</a></li>
            </ul>
        </header>
    )
}

export default Header