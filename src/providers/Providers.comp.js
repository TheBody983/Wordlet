import React from 'react'
import AuthProvider from './AuthProvider'
import UserProvider from "./UserProvider"
import MarketProvider from "./MarketProvider"

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <UserProvider>
                <MarketProvider>
                    <div className="app">
                        {children}
                    </div>
                </MarketProvider>
            </UserProvider>
        </AuthProvider>
        )
    }