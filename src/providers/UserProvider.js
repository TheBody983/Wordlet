import React, { createContext, useContext } from "react";

import useWOT from "../hooks/use-wot.hook";
import { useAuth } from "./AuthProvider";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const { user } = useAuth()
    const { getWOTBalance } = useWOT( user )

    return (
        <UserContext.Provider value={{
            getWOTBalance
        }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}