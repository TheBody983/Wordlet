import { useState } from "react"
import React from "react"

const Header = () => {
    const [active, setActive] = useState("accueil")
    const buttons = {
        "accueil": "Accueil", 
        "marche": "Marché", 
        "collection": "Collection", 
        // "jeux": "Jeux",
        "apropos": "A Propos",
    }

    return (
        <header>
            <ul>
            {Object.entries(buttons).map(button => {
                return (
                    <li><a href={"#"+button[0]} id={"btn"+button[0]} className={active==button[0]?"active":""} onClick={()=>setActive(button[0])}>{button[1]}</a></li>
                )
            })}
            </ul>
        </header>
    )
}


export default Header