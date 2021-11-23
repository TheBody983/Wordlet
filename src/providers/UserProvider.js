import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useWOT from "../hooks/use-wot.hook";
import useWordTokens from "../hooks/use-wordtokens.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";
import useMarket from "../hooks/use-market.hook";
import useAccountState from "../hooks/use-account-state.hook";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { getTokenData, transferWordToken } = useWordTokens( )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )
    const { updateTokenPrice, userSalelist, getCurrentUserSalelist, buyWordtoken, listTokenForSale, removeTokenFromSale, getTokenPrice, marketListings, getMarketListings, addToSellerCatalog, removeFromSellerCatalog, userIsSeller} = useMarket( user )
    const { setupAccount } = useAccountState( )


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
            updateTokenPrice,

        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}