import React, { createContext, useContext } from "react";

import { useAuth } from "./AuthProvider";

import useMarketHook from "../hooks/use-market.hook";

const MarketContext = createContext()

export default function MarketProvider({ children }) {
    const { user } = useAuth()
    const { userSalelist, getCurrentUserSalelist } = useMarketHook( user )

    return (
        <MarketContext.Provider value={{
            userSalelist,
            getCurrentUserSalelist,

        }}>
            { children }
        </MarketContext.Provider>
    )


}

export const useMarket = () => {
    return useContext(MarketContext)
}
