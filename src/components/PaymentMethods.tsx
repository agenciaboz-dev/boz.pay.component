import React from "react"
import { Box, MenuItem, useMediaQuery } from "@mui/material"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from "@mui/icons-material/Pix"
import colors from "../style/colors"
import ReceiptIcon from "@mui/icons-material/Receipt"

interface PaymentMethodsProps {
    paymentMethod: PaymentMethod
    setPaymentMethod: (value: PaymentMethod) => void
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ paymentMethod, setPaymentMethod }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const methods = [
        {
            name: "Cartão",
            icon: <CreditCardIcon />,
            method: "card" as PaymentMethod,
        },
        {
            name: "PIx",
            icon: <PixIcon />,
            method: "pix" as PaymentMethod,
        },
        {
            name: "Boleto",
            icon: <ReceiptIcon />,
            method: "boleto" as PaymentMethod,
            // disabled: true,
        },
    ]

    return (
        <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw", textAlign: "start", padding: isMobile ? "5vw 5vw 0" : "2vw 5vw 0" }}>
            <h3>MÉTODOS DE PAGAMENTO</h3>

            <Box
                sx={{
                    gap: "1vw",
                    justifyContent: isMobile ? "space-between" : "start",
                    width: isMobile ? "100%" : "30%",
                }}
            >
                {methods.map((item) => {
                    const current = paymentMethod == item.method
                    return (
                        <MenuItem
                            key={item.name}
                            sx={{
                                flexDirection: "column",
                                border: `1px solid ${colors.border}`,
                                borderRadius: "1vw",
                                color: current ? "white" : colors.unactive,
                                width: isMobile ? "32%" : "10vw",
                                bgcolor: current ? colors.primary : "white",
                                pointerEvents: current ? "none" : "auto",
                            }}
                            onClick={() => setPaymentMethod(item.method)}
                        >
                            {item.icon}
                            {item.name}
                        </MenuItem>
                    )
                })}
            </Box>
        </Box>
    )
}
