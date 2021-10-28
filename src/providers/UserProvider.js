import React, { createContext, useContext } from "react";
import useMarket from "../hooks/use-market.hook";
import useUserWordTokens from "../hooks/use-user-wordtokens.hook";

import useWOT from "../hooks/use-wot.hook";
import { useAuth } from "./AuthProvider";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )
    const { userWordTokens, getUserWordTokens } = useUserWordTokens( user )
    const { userSalelist, getUserSalelist } = useMarket( user )

    console.log("UserProvider : userSalelist")
    console.log(userSalelist)

    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
            userWordTokens,
            getUserWordTokens,
            userSalelist,
            getUserSalelist,
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}