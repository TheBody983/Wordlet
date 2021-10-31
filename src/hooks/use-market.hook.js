import { useEffect, useState } from "react";

import { query, mutate, tx } from '@onflow/fcl'
import { GET_USER_SALELIST } from "../cadence/get-user-salelist.script";
import { GET_SELLER_CATALOG } from "../cadence/get-seller-catalog.script";
import { BUY_WORDTOKEN } from "../cadence/buy-wordtoken.tx";
import { LIST_TOKEN_FOR_SALE } from "../cadence/list-token-for-sale.tx";
import { REMOVE_TOKEN_FROM_SALE } from "../cadence/remove-token-from-sale.tx";
import { GET_TOKEN_PRICE } from "../cadence/get-token-price.script";
import { GET_MARKET_LISTINGS } from "../cadence/get-market-listings.script";

export default function useMarketHook( user ) {
    const [ userSalelist, setUserSalelist ] = useState(null)
    const [ sellerCatalog, setSellerCatalog ] = useState([])
	const [ tokensToSell, setTokensToSell ] = useState([])
    const [ tokenPrice, setTokenPrice ] = useState(null)
    const [ marketListings, setMarketListings] = useState([])

    useEffect( () => {
        getCurrentUserSalelist()
        getSellerCatalog()
        getMarketListings()
    }, [ user ] )

    const getUserSalelist = async (address) => {
        try {
            await query({
                cadence: GET_USER_SALELIST,
                args: (arg, t) => [
                    arg(address, t.Address)
                ]
            })
            .then(function(data) {
                setUserSalelist(data)
            })
            
        } catch (error) {
            console.error(error)
        }
    }
    
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
                getMarketListings()
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    const getMarketListings = async()=>{
        try {
            await query({
                cadence: GET_MARKET_LISTINGS,
                args: (arg, t) => []
            })
            .then(function(data) {
                // This is the power of StackOverflow !!!
                setMarketListings(Object.entries(data).map((e) => ( { "id": parseInt(e[0]), "seller": e[1]} )) );
            })
        } catch (error) {
            console.debug("getMarketListings Failed")
            console.error(error)
        }
    }

    const getTokenPrice = async(address, tokenId, setTokenPrice)=>{
        try {
            await query({
                cadence: GET_TOKEN_PRICE,
                args: (arg, t) => [
                    arg(address, t.Address),
                    arg(tokenId, t.UInt64)
                ]
            })
            .then(function(data) {
                setTokenPrice(data)
            })
        } catch (error) {
            console.debug("getTokenPrice Failed")
            console.error(error)
        }
    }

    const buyWordtoken = async(tokenId, address)=>{
        try {
            let transaction = await mutate({
                cadence: BUY_WORDTOKEN,
                limit: 100,
                args: (arg, t) => [
                    arg(tokenId, t.UInt64),
                    arg(address, t.Address)
                ]
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    const removeTokenFromSale = async(tokenId)=>{
        try {
            let transaction = await mutate({
                cadence: REMOVE_TOKEN_FROM_SALE,
                limit: 100,
                args: (arg, t) => [
                    arg(tokenId, t.UInt64)
                ]
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    const listTokenForSale = async(tokenId, price)=>{
        try {
            let transaction = await mutate({
                cadence: LIST_TOKEN_FOR_SALE,
                limit: 100,
                args: (arg, t) => [
                    arg(tokenId, t.UInt64),
                    arg(price, t.UFix64)
                ]
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    return { userSalelist, getCurrentUserSalelist, sellerCatalog, setSellerCatalog, listTokenForSale, buyWordtoken, removeTokenFromSale, getTokenPrice, marketListings, getMarketListings }
}