import React from 'react'
import AuthProvider from './AuthProvider'
import UserProvider from "./UserProvider"

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <UserProvider>
                    <div className="app">
                        {children}
                    </div>
            </UserProvider>
        </AuthProvider>
        )
    }