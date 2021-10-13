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
        const encoded = await fcl
            .send([fcl.script(script)])
        const decoded = fcl.decode(encoded)
        console.log(decoded)
    }
    catch(error){
        console.error(error)
    }
}

export default executeScript;