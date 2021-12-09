import React from "react";

import Community from '../components/Community';
import Header from "../components/Header";

const About = () => {
    return(<>
        <Header/>
        <section id="community">
            <div className="row">
            <p className="card" style={{width:"50%", maxHeight:"75vh", overflowY:"scroll"}}>

            On a tous déjà collectionné des cartes, des figurines, des timbres, des fleurs séchées, 
            des papillons. Collectionner pour assembler, collectionner pour laisser une trace. 
            Activité intime, acte collectif. Collectionner pour contempler sa collection, 
            collectionner pour échanger avec les autres. Obsession, fascination qui réunit les générations. 
            Tradition et innovation. Nos objets techniques et technologiques deviennent aussi objets de collections.
            <br/><br/>
            Wordlet, notre création est une application décentralisée qui permet à tous ses utilisateurs de Collectionner, 
            d’acquérir et d’échanger des mots. Nous faisons le lien entre la tradition ancestrale et le monde de demain. 
            Grâce au virtuel nous voulons rendre vie et corps aux mots. Ils vont retrouver leur pouvoir interactif.
            <br/><br/>
            L’on pourrait se dire que c'est inutile, futile. L’on pourrait se dire que c’est un gadget de plus. 
            Mais quand on y réfléchit, les mots sont à la base du langage, des jeux, de l'art Littéraire, de toutes les 
            formes de communication. Le mot porte un sens, le mot est une trace graphique. Le mot est poésie. 
            On l’entend, on le voit. Et l’on a tous nos mots fétiches. C’est notre histoire.
            <br/><br/>
            L'art aujourd’hui s’empare du numérique, et Wordlet s’empare des mots pour vous les rendre. 
            Vos mots, ceux qui vous sont chers. Wordlet met à votre disposition un environnement de liberté d'expression 
            grâce à un support contemporain et ludique.
            <br/><br/>
            Un panel d'action vous est offert, comprenant :<br/>
            • Acheter des mots sur le marché<br/>
            • Collectionner tous les mots d'une collection<br/>
            • Les utiliser dans des jeux exclusifs comme le Decoy 6<br/>
            • Les combiner dans la Forge pour créer des poèmes, citation, ou tout ce à quoi votre coeur aspire<br/>
            • Exposer vos créations et collections dans le Wordlet Wall of Fame<br/><br/>

            Nous sommes une équipe calédonienne soutenue par l'Université de la Nouvelle-Calédonie par son pôle Pépite, 
            et par Cryptos.nc et nous aspirons à créer le premier projet calédonien basé sur la Blockchain
            </p>
            <Community />
            </div>
            <img src="marche.png" id="marche" alt=""/>
        </section>
    </>)
}

export default About 