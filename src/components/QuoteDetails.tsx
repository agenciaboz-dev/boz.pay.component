import React, { useEffect, useState } from "react"
import { Box, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { QuoteComponent } from "./QuoteComponent"
import { CurrencyText } from "./CurrencyText"
import { useTotalValue } from "../hooks/useTotalValue"
import { Order } from "../definitions/Order"

interface QuoteDetailsProps {
    quoteList: Quote[]
    order: Order
}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({ quoteList: originalQuoteList, order }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const quoteList: Quote[] = [
        // {
        //     AllowBuyLabel: false,
        //     Carrier: "Ninguém",
        //     CarrierCode: "NGM",
        //     DeliveryTime: "0",
        //     Error: false,
        //     OriginalDeliveryTime: "0",
        //     OriginalShippingPrice: "0",
        //     ResponseTime: "0",
        //     ServiceCode: "none",
        //     ServiceDescription: "Ninguém",
        //     ShippingPrice: "1",
        // },
        ...originalQuoteList,
    ]

    const { setTotalValue } = useTotalValue()

    const [selectedQuote, setSelectedQuote] = useState("none")

    useEffect(() => {
        // setTotalValue(Number(order.total) + Number(quoteList.find((quote) => quote.ServiceCode == selectedQuote)!.ShippingPrice))
    }, [])

    return (
        <>
            <p>COTAÇÃO DE ENTREGA</p>

            <Box sx={{ flexDirection: "column", color: "black", gap: "1vw", fontWeight: "bold", flex: 1 }}>
                <TextField
                    select
                    value={selectedQuote}
                    onChange={(ev) => {
                        const quote = quoteList.find((quote) => quote.ServiceCode == ev.target.value)!

                        setTotalValue(Number(order.total) + Number(quote.ShippingPrice))
                        setSelectedQuote(quote.ServiceCode)
                    }}
                    size={isMobile ? "medium" : "small"}
                    sx={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    <MenuItem sx={{ display: "none" }} value={"none"}></MenuItem>

                    {quoteList
                        .filter((quote) => !quote.Error)
                        .map((quote) => (
                            <MenuItem
                                sx={{ flexDirection: "column", alignItems: "flex-start", flex: 1 }}
                                key={quote.ServiceCode}
                                value={quote.ServiceCode}
                            >
                                <Box sx={{ fontWeight: "bold", fontSize: isMobile ? "1rem" : "1.2vw" }}>{quote.ServiceDescription}</Box>
                                <Box
                                    sx={{
                                        justifyContent: "space-between",
                                        flex: 1,
                                        padding: "0 45px 0",
                                        paddingLeft: isMobile ? "2vw" : "0.5vw",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        fontSize: isMobile ? "1rem" : "1.2vw",
                                    }}
                                >
                                    <Box>{quote.DeliveryTime} dia(s)</Box>
                                    <CurrencyText value={quote.ShippingPrice} />
                                </Box>
                            </MenuItem>
                        ))}
                </TextField>
            </Box>
        </>
    )
}
