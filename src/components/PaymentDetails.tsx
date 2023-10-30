import React, { useEffect, useState } from "react"
import { Box, MenuItem, Skeleton, TextField, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { CurrencyText } from "./CurrencyText"
import { getParcelas } from "../tools/parcelas"
import { useTotalValue } from "../hooks/useTotalValue"

interface PaymentDetailsProps {
    order?: Order
    paymentMethod: PaymentMethod
    formikValues: CardForm | Form
    setInstallments: (value: number) => void
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order, paymentMethod, formikValues, setInstallments }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { totalValue } = useTotalValue()

    const notInstallments = paymentMethod != "card" || (formikValues as CardForm).type != "credit"

    const [parcelamento, setParcelamento] = useState(1)

    useEffect(() => {
        if (notInstallments) {
            console.log(":(")
            setInstallments(1)
            setParcelamento(1)
        }
    }, [notInstallments])

    return order ? (
        <Box
            sx={{
                bgcolor: "white",
                flexDirection: "column",
                borderRadius: "1vw",
                border: `1px solid ${colors.border}`,
                padding: isMobile ? "5vw" : "1vw 2vw",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <TextField
                select
                disabled={notInstallments}
                value={notInstallments ? 1 : parcelamento}
                onChange={(ev) => {
                    setParcelamento(Number(ev.target.value))
                    setInstallments(Number(ev.target.value))
                }}
                size={isMobile? "medium" : "small"}
            >
                {getParcelas(totalValue).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.text}
                    </MenuItem>
                ))}
            </TextField>
            <Box sx={{ justifyContent: "space-between" }}>
                <p>Total a pagar:</p>
                <CurrencyText value={totalValue} color="black" />
            </Box>
        </Box>
    ) : (
        <>
            <Skeleton variant="rounded" sx={{ width: isMobile? "100%" : "30vw", height: "7vw", borderRadius: "1vw" }} />
        </>
    )
}
