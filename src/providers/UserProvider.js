import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useWOT from "../hooks/use-wot.hook";
// import useWordTokens from "../hooks/use-wordtokens.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { getTokenData } = useUserWordTokens( )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )

    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            userWordTokens,
            getUserWordTokens,
            getTokenData,
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}