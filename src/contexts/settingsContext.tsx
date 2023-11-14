import { createContext, useState } from "react"
import React from "react"

interface SettingsContextValue {
    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number
    onPaid: (charge: Charge) => void

    sandbox?: boolean
    params?: boolean
}

interface SettingsProviderProps {
    children: React.ReactNode

    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number
    onPaid: (charge: Charge) => void

    sandbox?: boolean
    params?: boolean
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
    onPaid,
    params,
}) => {
    return (
        <SettingsContext.Provider
            value={{ storeIdentifier, pagseguroToken, pagseguroTokenSandbox, creditCardPublicKey, sandbox, referenceId, onPaid, params }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
