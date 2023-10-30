import React, { useEffect } from "react"
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { useLocation, useNavigate } from "react-router-dom"
import { SuccessText } from "../components/SuccessText"
import { Header } from "../components/Header"
import Barcode from "react-barcode"
import { useSnackbar } from "burgos-snackbar"
import { useIo } from "../hooks/useIo"
import { useTotalValue } from "../hooks/useTotalValue"
import PrintIcon from "@mui/icons-material/Print"

interface BoletoProps {}

export const Boleto: React.FC<BoletoProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const data: { barcode: string; due_date: string; formatted_barcode: string; link: string; order: Order } = useLocation().state.data

    const { totalValue } = useTotalValue()

    const total = `R$ ${totalValue.toFixed(2).replace(".", ",")}`
    const width = window.innerWidth

    const io = useIo()

    const { snackbar } = useSnackbar()

    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText(data.barcode)
        snackbar({ severity: "info", text: "Copiado" })
    }

    useEffect(() => {
        io.on("pagseguro:paid", (ioData) => {
            const id = ioData.id
            const charge = ioData.charge
            console.log(id)

            if (id == data.order.id) {
                console.log(charge)

                if (charge.status == "PAID") {
                    navigate("/paid", {
                        state: {
                            data: {
                                order: data.order,
                                date: new Date(charge.paid_at),
                                installments: 1,
                                method: "boleto",
                                type: charge.payment_method.type,
                            },
                        },
                    })
                } else if (charge.status == 'WAITING') {
                    snackbar({ severity: "info", text: 'Aguardando pagamento' })
                    
                } else {
                    snackbar({ severity: "error", text: charge.payment_response.message })
                }
            }
        })

        return () => {
            io.off("pagseguro:paid")
        }
    }, [data.order])

    useEffect(() => {
        if (!data) navigate("/404")
        console.log(data)
    }, [])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: colors.unactive,
                fontWeight: "bold",
                flexDirection: "column",
                overflow: "hidden",
                alignItems: "center",
            }}
        >
            <Header />
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    overflowY: "auto",
                    gap: isMobile ? "2vw" : "1vw",
                    padding: isMobile ? "0 0 20vw 0" : "2vw 0 10vw 0",
                }}
            >
                <SuccessText email={data.order.billing.email} />
                <Box
                    sx={{
                        border: `1px solid ${colors.border}`,
                        borderRadius: "2vw",
                        width: isMobile ? "90vw" : "80vw",
                        padding: isMobile ? "5vw" : "1vw",
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ justifyContent: "space-between", alignItems: "center", gap: "1vw" }}>
                        <h3 style={{ color: colors.primary, textAlign: "center" }}>AGORA SO FALTA PAGAR O SEU BOLETO:</h3>
                        <Button
                            variant="contained"
                            sx={{ color: "white" }}
                            onClick={() => window.open(data.link, "_blank")?.focus()}
                            endIcon={<PrintIcon />}
                        >
                            Imprimir boleto
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "column",
                            borderTop: `1px solid ${colors.border}`,
                            padding: isMobile ? "5vw 0 0" : "1vw 0",
                            gap: isMobile ? "2vw" : "1vw",
                            fontWeight: "normal",
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        <p>Você também pode utilizar o leitor de código de barras do aplicativo do seu banco ou copiar o código:</p>
                        <Box
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                gap: isMobile ? "5vw" : "1vw",
                            }}
                        >
                            <Barcode value={data.barcode} background={colors.background} />
                            {/* <TextField value={data.formatted_barcode} multiline InputProps={{ readOnly: true }} sx={{ width: "100%" }} /> */}
                            <Button variant="contained" sx={{ alignSelf: "center", color: "white" }} onClick={handleCopy}>
                                Copiar código
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
