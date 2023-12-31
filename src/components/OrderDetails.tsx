import React from "react"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { Shipping } from "./Shipping"
import { Order } from "../definitions/Order"

interface OrderDetailsProps {
    order?: Order
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return order ? (
        <Box
            sx={{
                border: `1px solid ${colors.border}`,
                flexDirection: "column",
                bgcolor: "white",
                padding: isMobile ? "5vw" : "1vw 2vw",
                borderRadius: "1vw",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <h3>RESUMO DO PEDIDO</h3>
            <Shipping order={order} />
        </Box>
    ) : (
        <>
            <Skeleton variant="rounded" sx={{ width: isMobile ? "100%" : "100%", height: "17vw", borderRadius: "1vw" }} />
        </>
    )
}
