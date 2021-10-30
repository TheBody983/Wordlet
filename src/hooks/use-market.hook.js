import { useEffect, useState } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_SALELIST } from "../cadence/get-user-salelist.script";
import { GET_SELLER_CATALOG } from "../cadence/get-seller-catalog.script";

// TODO Cleanup
import checkTokensForSale from "../cadence/checkTokensForSale.script";
import getTokenPrice from "../cadence/getTokenPrice.script";
import listTokenForSale from "../cadence/listTokenForSale.tx";
import buyToken from "../cadence/buyToken.tx";
import removeTokenFromSale from "../cadence/removeTokenFromSale.tx";


export default function useMarketHook( user ) {
    const [ userSalelist, setUserSalelist ] = useState(null)
    const [ sellerCatalog, setSellerCatalog ] = useState([])
    // const [ marketListings, setMarketListings ] = useState(null)

	const [tokensToSell, setTokensToSell] = useState([])

    useEffect( () => {
        getCurrentUserSalelist()
        getSellerCatalog()
        checkMarketplace()
    }, [ user ] )

    const getCurrentUserSalelist = async () => {
        try {
            await query({
                cadence: GET_USER_SALELIST,
                args: (arg, t) => [
                    arg(user?.addr, t.Address)
                ]
            })
            .then(function(data) {
                setUserSalelist(data)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    const getSellerCatalog = async () => {
        try {
            await query({
                cadence: GET_SELLER_CATALOG
            })
            .then(function(data) {
                setSellerCatalog(data)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    // TODO Cleanup
    const checkMarketplace = async ( ) => {
        var marketplaceData = []
        for(const sellerAddr of sellerCatalog){

			// Récupère les IDs des tokens à vendre sur le compte wordlet
			const tokens = await checkTokensForSale(sellerAddr)

			// Récupère les métadonnées de chaque token
			for (const id of tokens) {
				var decodedMetadata = {}
				decodedMetadata["price"] = await getTokenPrice(sellerAddr, id)
				decodedMetadata["id"] = id
                decodedMetadata["seller"] = sellerAddr
				marketplaceData.push(decodedMetadata);
			}
        }
        setTokensToSell(marketplaceData);

	};

    return { userSalelist, getCurrentUserSalelist, sellerCatalog, setSellerCatalog, checkMarketplace, tokensToSell, listTokenForSale, buyToken, removeTokenFromSale }
}