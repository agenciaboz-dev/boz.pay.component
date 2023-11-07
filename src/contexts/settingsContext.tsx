import { createContext, useState } from "react"
import React from "react"

interface SettingsContextValue {
    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number

    sandbox?: boolean
}

interface SettingsProviderProps {
    children: React.ReactNode

    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number

    sandbox?: boolean
}

const SettingsContext = createContext<SettingsContextValue>({} as SettingsContextValue)

export default SettingsContext

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
    children,
    storeIdentifier,
    pagseguroToken,
    pagseguroTokenSandbox,
    creditCardPublicKey,
    sandbox,
    referenceId,
}) => {
    return (
        <SettingsContext.Provider value={{ storeIdentifier, pagseguroToken, pagseguroTokenSandbox, creditCardPublicKey, sandbox, referenceId }}>
            {children}
        </SettingsContext.Provider>
    )
}
