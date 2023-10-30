import React from "react"
import { Box, MenuItem } from "@mui/material"
import { CurrencyText } from "./CurrencyText"

interface QuoteComponentProps {
    quote: Quote
    value: string
}

export const QuoteComponent: React.FC<QuoteComponentProps> = ({ quote, value }) => {
    return (
        <MenuItem sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <p style={{ fontWeight: "bold" }}>{quote.ServiceDescription}</p>

            <Box sx={{ justifyContent: "space-between", width: "100%" }}>
                <p>{quote.DeliveryTime} dias</p>
                <CurrencyText value={quote.ShippingPrice} />
            </Box>
        </MenuItem>
    )
}
