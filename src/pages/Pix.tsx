import React, { useEffect } from "react"
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { useLocation, useNavigate } from "react-router-dom"
import { SuccessText } from "../components/SuccessText"
import { Header } from "../components/Header"
import { QRCode } from "react-qrcode-logo"
import { useSnackbar } from "burgos-snackbar"
import { useIo } from "../hooks/useIo"

interface PixProps {}

export const Pix: React.FC<PixProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const data: { order: Order; qrcode: QrCode } = useLocation().state.data

    const total = `R$ ${data.order.total.replace(".", ",")}`
    const width = window.innerWidth

    const io = useIo()

    const { snackbar } = useSnackbar()

    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText(data.qrcode.text)
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
                                method: "pix",
                                type: charge.payment_method.type,
                            },
                        },
                    })
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
                    gap: isMobile? "2vw" : "1vw",
                    padding: isMobile? "0 0 20vw 0" : "2vw 0 10vw 0",
                }}
            >
                <SuccessText email={data.order.billing.email} />
                <Box
                    sx={{
                        border: `1px solid ${colors.border}`,
                        borderRadius: "2vw",
                        width: isMobile? "90vw" : "80vw",
                        padding: isMobile? "5vw" : "1vw",
                        flexDirection: "column",
                        gap: isMobile? "5vw" : "1vw",
                        alignItems: "center",
                    }}
                >
                    <h3 style={{ color: colors.primary, textAlign: "center" }}>FINALIZE O PAGAMENTO USANDO PIX!</h3>
                    <Box
                        sx={{
                            flexDirection: "column",
                            borderTop: `1px solid ${colors.border}`,
                            padding: isMobile? "5vw 0 0" : "1vw 0",
                            gap: isMobile? "2vw" : "1vw",
                            fontWeight: "normal",
                            textAlign: "center",
                            width: "100%"
                        }}
                    >
                        <p>Você pode utilizar a câmera do seu celular para ler o QR CODE ou copiar o código e pagar no aplicativo de seu banco:</p>
                        <Box
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                gap: isMobile? "5vw" : "1vw",
                            }}
                        >
                            <QRCode value={data.qrcode.text} size={isMobile? (width * 0.8) : (width * 0.2)} bgColor={colors.background} />
                            <Button variant="contained" sx={{ alignSelf: "center", color: "white" }} onClick={handleCopy}>
                                Copiar código
                            </Button>
                            <TextField value={data.qrcode.text} multiline InputProps={{ readOnly: true }} sx={{ width: "100%" }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
