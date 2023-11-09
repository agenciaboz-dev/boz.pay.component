import React from "react"
import { Box, SxProps } from "@mui/material"
import App from "./App"
import { SettingsProvider } from "./contexts/settingsContext"

interface BozPayProps {
    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number
    wrapperSx?: SxProps
    sandbox?: boolean
    onPaid: (charge: Charge) => void
}

export const BozPay: React.FC<BozPayProps> = ({
    storeIdentifier,
    pagseguroToken,
    pagseguroTokenSandbox,
    creditCardPublicKey,
    sandbox,
    wrapperSx,
    referenceId,
    onPaid,
}) => {
    return (
        <Box sx={{ width: "100%", ...wrapperSx }} className="bozpay">
            <SettingsProvider
                storeIdentifier={storeIdentifier}
                pagseguroToken={pagseguroToken}
                pagseguroTokenSandbox={pagseguroTokenSandbox}
                creditCardPublicKey={creditCardPublicKey}
                sandbox={sandbox}
                referenceId={referenceId}
                onPaid={onPaid}
            >
                <App />
            </SettingsProvider>
        </Box>
    )
}
