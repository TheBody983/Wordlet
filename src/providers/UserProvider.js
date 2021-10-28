import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useWOT from "../hooks/use-wot.hook";
import useWordTokens from "../hooks/use-wordtokens.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";
import useMarket from "../hooks/use-market.hook";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { getTokenTokenData } = useUserWordTokens( )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )
    const { userSalelist, getCurrentUserSalelist } = useMarket( user )

    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            userWordTokens,
            getUserWordTokens,
            userSalelist,
            getCurrentUserSalelist,
            getTokenTokenData,
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}