import { useState } from "react"
import React from "react"

import {Link} from 'react-router-dom';

const Header = () => {
    const [active, setActive] = useState("accueil")
    const buttons = {
        "": "Accueil", 
        "forge": "Forge",
        "advanced": "Avancé",
        "about": "A Propos",
    }

    return (
        <header>
            <ul>
            {Object.entries(buttons).map(button => {
                return (
                    <li><Link to={"/"+button[0]}>{button[1]}</Link></li>
                )
            })}
            </ul>
            <h1 id="wordlet-title">Wordlet</h1>
        </header>
    )
}


export default Header