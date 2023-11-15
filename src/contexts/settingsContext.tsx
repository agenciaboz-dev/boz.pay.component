import { createContext, useState } from "react"
import React from "react"

interface SettingsProviderProps extends Settings {
    children: React.ReactNode
}

const SettingsContext = createContext<Settings>({} as Settings)

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
