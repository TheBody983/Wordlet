import React, { createContext, useContext } from "react";

import useWOT from "../hooks/use-wot.hook";
import { useAuth } from "./AuthProvider";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { WOTBalance, getWOTBalance, createWOTVault } = useWOT( user )

    console.log("UserProvider")
    console.log(WOTBalance)

    return (
        <UserContext.Provider value={{
            WOTBalance,
            getWOTBalance,
            createWOTVault,
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}