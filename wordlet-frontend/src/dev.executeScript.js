import * as fcl from "@onflow/fcl";

const script = `
pub fun main(): String {
    return "ça marche"
}
`

/**
 * Execute un script et renvoie la valeur de retour dans la console
 */
const executeScript = async () => {

    try {
        // Execute un script placé en paramètre 
        var result = await fcl
        .send([fcl.script(script)])
        result = fcl.decode(result)
        console.log(result)
    }
    catch(error){
        console.log("Erreur lors de l'execution du script")
        console.error(error)
    }
}

export default executeScript;