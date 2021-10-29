import { useEffect, useState } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_SALELIST } from "../cadence/get-user-salelist.script";
import { GET_SELLER_CATALOG } from "../cadence/get-seller-catalog.script";

export default function useMarketHook( user ) {
    const [ userSalelist, setUserSalelist ] = useState(null)
    const [ sellerCatalog, setSellerCatalog ] = useState(null)
    // const [ marketListings, setMarketListings ] = useState(null)

    useEffect( () => {
        getCurrentUserSalelist()
        getSellerCatalog()
        // getMarketListings()
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

    // TODO makework
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

    // const getUserSalelist = async (addr) => {
    //     try {
    //         await query({
    //             cadence: GET_USER_SALELIST,
    //             args: (arg, t) => [
    //                 arg(addr, t.Address)
    //             ]
    //         })
    //         .then(function(data) {
    //             setUserSalelist(data)
    //         })
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // TODO get-token-price.script

    // const getMarketListings = async () => {
    //     let marketplaceMetadata = []

    //     for(const sellerAddr of sellerCatalog) {
    //         const tokens = await getUserSalelist(sellerAddr)
    //         for (const id of tokens) {
	// 			const decodedMetadata = await getTokenMetadata(id)
	// 			decodedMetadata["price"] = await getTokenPrice(sellerAddr, id)
	// 			decodedMetadata["id"] = id
    //             decodedMetadata["seller"] = sellerAddr
	// 			marketplaceMetadata.push(decodedMetadata);
	// 		}
    //         setTokensToSell(marketplaceMetadata);
    //     }

    //     try {
    //         await query({
    //             cadence: GET_USER_SALELIST,
    //             args: (arg, t) => [
    //                 arg(user?.addr, t.Address)
    //             ]
    //         })
    //         .then(function(data) {
    //             setUserSalelist(data)
    //             console.debug(userSalelist)
    //         })
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return { userSalelist, getCurrentUserSalelist, sellerCatalog, setSellerCatalog }
}