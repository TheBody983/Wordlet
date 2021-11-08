import React from "react"

import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <ul>
                <li><Link to = "/">Accueil</Link></li>
                <li><Link to = "/forge">Forge</Link></li>
                <li><Link to = "/advanced">Admin</Link></li>
                <li><Link to = "/about">À propos</Link></li>
            </ul>
        </header>
    )
}

export default Header