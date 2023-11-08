import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import React from "react"
import { IoProvider } from "./contexts/ioContext"
import { TotalValueContextProvider } from "./contexts/totalValueContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <IoProvider>
                <TotalValueContextProvider>
                    <Snackbar />
                    {children}
                </TotalValueContextProvider>
            </IoProvider>
        </SnackbarProvider>
    )
}
