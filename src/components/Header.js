import { useState } from "react"
import React from "react"

import {Link} from 'react-router-dom';

const Header = () => {
    const [active, setActive] = useState("accueil")
    const buttons = {
        "": "Accueil", 
        "marche": "Marché", 
        "collection": "Collection", 
        // "jeux": "Jeux",
        "apropos": "A Propos",
        "forge": "Forge",
        "advanced": "Admin",
        "about": "A Propos",
        
    }

    return (
        <header>
            <ul>
            {Object.entries(buttons).map(button => {
                return (
                    <li><Link to={"/"+button[0]} className={active==button[0]?"active":""} onClick={()=>setActive(button[0])}>{button[1]}</Link></li>
                )
            })}
            </ul>
        </header>
    )
}


export default Header