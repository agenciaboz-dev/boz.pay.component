import React, { useEffect } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Header } from "../components/Header"
import colors from "../style/colors"
import { useLocation, useNavigate } from "react-router-dom"
import { SuccessText } from "../components/SuccessText"
import { getParcelas } from "../tools/parcelas"
import { useTotalValue } from "../hooks/useTotalValue"

interface PaidProps {}

const Field: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
        <p style={{ fontWeight: "normal" }}>{title}</p>
        <p style={{ fontWeight: "bold", color: "black" }}>{value}</p>
    </Box>
)

export const Paid: React.FC<PaidProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { totalValue } = useTotalValue()

    const data: { order: Order; date: Date; installments: number; method: PaymentMethod; type: string; card: { last_digits: string } } =
        useLocation().state.data

    const quote = `R$ ${(totalValue - Number(data.order.total)).toFixed(2).toString().replace(".", ",")}`
    const subtotal = `R$ ${data.order.total.replace(".", ",")}`
    const total = `R$ ${totalValue.toFixed(2).toString().replace(".", ",")}`
    const installments = getParcelas(totalValue.toFixed(2).toString())

    const navigate = useNavigate()

    useEffect(() => {
        if (!data) navigate("/404")
    }, [])

    return data.order ? (
        <Box
            sx={{
                bgcolor: "background.default",
                color: colors.unactive,
                fontWeight: "bold",
                flexDirection: "column",
                overflow: "hidden",
                alignItems: "center",
                gap: "3vw",
            }}
        >
            <Header />
            <SuccessText email={data.order.billing.email} />

            <Box
                sx={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: "2vw",
                    width: isMobile ? "90vw" : "80vw",
                    padding: isMobile ? "5vw" : "2vw",
                    flexDirection: "column",
                    gap: isMobile ? "5vw" : "2vw",
                }}
            >
                <p style={{ fontWeight: "normal", color: colors.primary }}>
                    <span style={{ fontWeight: "bold" }}>PEDIDO: </span>
                    {data.order.id}
                </p>

                <Box
                    sx={{
                        borderTop: `1px solid ${colors.border}`,
                        borderBottom: `1px solid ${colors.border}`,
                        flexDirection: "column",
                        padding: isMobile ? "5vw 0" : "2vw 0",
                        gap: isMobile ? "5vw" : "2vw",
                    }}
                >
                    <Field
                        title="Forma de pagamento"
                        value={data.method == "card" ? `${data.type}: **** **** **** ${data.card?.last_digits}` : data.type}
                    />
                    <Field title="Data" value={data.date.toLocaleString("pt-br").replace(",", " -")} />
                    <Box sx={{ justifyContent: "space-between" }}>
                        <Field title="Subtotal" value={subtotal} />
                        <Field title="Frete" value={quote} />
                    </Box>
                </Box>
                <Box sx={{ alignSelf: "flex-end", width: isMobile ? "80vw" : "15vw", flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
                    {data.method == "card" && (
                        <Box sx={{ justifyContent: "space-between" }}>
                            <p style={{ fontWeight: "normal" }}>{installments[data.installments - 1]?.text}</p>
                        </Box>
                    )}
                    <Box sx={{ justifyContent: "space-between" }}>
                        <p style={{ fontWeight: "normal" }}>Total pago:</p>
                        <p style={{ color: "black" }}>{total}</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    ) : (
        <></>
    )
}
