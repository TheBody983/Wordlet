import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useWOT from "../hooks/use-wot.hook";
import useWordTokens from "../hooks/use-wordtokens.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";
import useMarket from "../hooks/use-market.hook";
import useAccountState from "../hooks/use-account-state.hook";
import useForgedToken from "../hooks/use-forgedtoken.hook";
import useUserForgedTokens from "../hooks/use-user-forgedtokens.hook";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { getTokenData, transferWordToken } = useWordTokens( )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )
    const { userForgedTokens, getUserForgedTokens } = useUserForgedTokens( user )
    const { userSalelist, getCurrentUserSalelist, buyWordtoken, listTokenForSale, removeTokenFromSale, getTokenPrice, marketListings, getMarketListings, addToSellerCatalog, removeFromSellerCatalog, userIsSeller} = useMarket( user )
    const { setupAccount } = useAccountState( )
    const { mintForgedToken } = useForgedToken( )


    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            setupAccount,
            userWordTokens,
            getUserWordTokens,
            getTokenData,
            userSalelist,
            getCurrentUserSalelist,
            transferWordToken,
            buyWordtoken,
            listTokenForSale,
            removeTokenFromSale,
            getTokenPrice,
            marketListings, 
            getMarketListings,
            addToSellerCatalog,
            removeFromSellerCatalog,
            userIsSeller,
            mintForgedToken

        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}