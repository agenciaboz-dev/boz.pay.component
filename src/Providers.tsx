import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import React, { useEffect } from "react"
import { IoProvider } from "./contexts/ioContext"
import { TotalValueContextProvider } from "./contexts/totalValueContext"
import { useSettings } from "./hooks/useSettings"
import { useNavigate } from "react-router-dom"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const settings = useSettings()
    const navigate = useNavigate()

    useEffect(() => {
        if (settings.referenceId) navigate("/")
    }, [settings.referenceId])

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
