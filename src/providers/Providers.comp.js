import React from 'react'
import AuthProvider from './AuthProvider'
import UserProvider from './UserProvider'
import TxProvider from './TxProvider'

export default function Providers({ children }) {
    return (
        <TxProvider>
            <AuthProvider>
                <UserProvider>
                        <div className="app">
                            {children}
                        </div>
                </UserProvider>
            </AuthProvider>
        </TxProvider>
        )
    }