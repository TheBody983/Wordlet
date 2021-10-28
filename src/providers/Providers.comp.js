import React from 'react'
import UserProvider from "./UserProvider"
import AuthProvider from './AuthProvider'

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