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
    const { user, loggedIn } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user, loggedIn )
    const { getTokenData, transferWordToken } = useWordTokens( )
    const { userWordTokens, getUserWordTokens, allWordTokenDatas, getAllWordTokenDatas} = useUserWordTokens( user, loggedIn )
    const { userForgedTokens, getUserForgedTokens } = useUserForgedTokens( user, loggedIn )
    const { userSalelist, getCurrentUserSalelist, buyWordtoken, listTokenForSale, removeTokenFromSale, getTokenPrice, marketListings, getMarketListings, addToSellerCatalog, removeFromSellerCatalog, userIsSeller, updateTokenPrice, getUserSalelist} = useMarket( user, loggedIn )
    const { setupAccount } = useAccountState( )
    const { mintForgedToken, getForgedTokenData, transferForgedtoken } = useForgedToken( )

    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            setupAccount,
            userWordTokens,
            getUserWordTokens,
			allWordTokenDatas,
			getAllWordTokenDatas,
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
            getUserSalelist,
            mintForgedToken,
            userForgedTokens,
            getUserForgedTokens,
            getForgedTokenData,
            transferForgedtoken

        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}