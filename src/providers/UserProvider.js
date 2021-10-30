import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useWOT from "../hooks/use-wot.hook";
import useWordTokens from "../hooks/use-wordtokens.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";
import useMarketHook from "../hooks/use-market.hook";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { getTokenData, transferWordToken } = useWordTokens( )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )
    const { userSalelist, getCurrentUserSalelist, tokensToSell, checkMarketplace } = useMarketHook( user )


    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            userWordTokens,
            getUserWordTokens,
            getTokenData,
            userSalelist,
            getCurrentUserSalelist,
            tokensToSell,
            checkMarketplace,
            tokensToSell,
            transferWordToken

        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}