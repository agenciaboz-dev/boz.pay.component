import React, { useEffect, useState } from "react"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { useIo } from "../hooks/useIo"
import { QuoteDetails } from "./QuoteDetails"
import { Order } from "../definitions/Order"

interface ShippingProps {
    order: Order
}

export const Shipping: React.FC<ShippingProps> = ({ order }) => {
    const shipping = order.shipping

    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const [quoteList, setQuoteList] = useState<Quote[]>()

    useEffect(() => {
        io.on("quote", (quoteList) => {
            setQuoteList(quoteList)
        })

        return () => {
            io.off("quote")
        }
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "0.5vw",
                // borderBottom: `1px solid ${colors.border}`,
                borderTop: `1px solid ${colors.border}`,
                padding: isMobile ? "5vw 0 0" : "1vw 0 0",
            }}
        >
            <p>ENDEREÇO DE ENTREGA</p>

            <Box sx={{ flexDirection: "column", color: "black", gap: "0.5vw", fontWeight: "bold", marginBottom: isMobile ? 0 : "1vw" }}>
                <p>
                    {shipping.address.address}. {shipping.address.number}
                </p>
                <p>
                    {shipping.address.district}. {shipping.address.complement}
                </p>
                <p>
                    {shipping.address.city}. {shipping.address.state}
                </p>
            </Box>

            {quoteList ? (
                <QuoteDetails quoteList={quoteList} order={order} />
            ) : (
                <Skeleton variant="rounded" sx={{ width: isMobile ? "100%" : "100%", height: "5vw", borderRadius: "1vw", alignSelf: "center" }} />
            )}
        </Box>
    )
}
