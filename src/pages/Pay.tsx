import React, { useCallback, useEffect, useState } from "react"
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material"
import { Header } from "../components/Header"
import { PaymentMethods } from "../components/PaymentMethods"
import colors from "../style/colors"
import { useNavigate, useParams } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { OrderDetails } from "../components/OrderDetails"
import { PaymentDetails } from "../components/PaymentDetails"
import LockIcon from "@mui/icons-material/Lock"
import brazilFlag from "../assets/brazil.svg"
import { getPaymentForm } from "../tools/paymentForm"
import { Form, Formik, FormikProps } from "formik"
import { PaymentForm } from "../components/PaymentForm"
import { useSnackbar } from "burgos-snackbar"
import { LoadingOverlay } from "../components/LoadingOverlay"
import { useTotalValue } from "../hooks/useTotalValue"
import { DebitAuthenticator } from "../components/DebitAuthenticator"
import { usePagseguro } from "../hooks/usePagseguro"
import { useSettings } from "../hooks/useSettings"
import { Order } from "../definitions/Order"
import { getCredentials } from "../tools/buildPagseguroCred"
import { app_version } from "../version"

interface PayProps {}

export const Pay: React.FC<PayProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const navigate = useNavigate()
    const settings = useSettings()
    const orderId = settings.referenceId

    const { encrypt } = usePagseguro()
    const { snackbar } = useSnackbar()
    const { setTotalValue, totalValue } = useTotalValue()

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
    const [order, setOrder] = useState<Order>()
    const [loading, setLoading] = useState(false)

    const initialValues = getPaymentForm(paymentMethod, order?.billing)
    const currentYear: number = new Date().getFullYear()

    const handleSubmit = useCallback(
        async (values: Form | CardForm) => {
            if (Number(totalValue.toFixed(2)) == order?.total) {
                snackbar({ severity: "error", text: "Selecione um frete" })
                return
            }
            if (loading) return
            let encrypted
            if (paymentMethod == "card") {
                const card = values as CardForm
                try {
                    encrypted = await encrypt(card, order.woocommerce)
                } catch (error) {
                    console.error("Encryption failed:", error)
                    // Handle the error, maybe show a message to the user
                    return
                }
            }

            const pagseguro = getCredentials(settings, order.woocommerce)

            const data = {
                ...values,
                id: order?.id,
                method: paymentMethod,
                total: totalValue.toFixed(2),
                encrypted,
                store: settings.storeIdentifier,
                pagseguro,
            }
            console.log(data)

            setLoading(true)
            io.emit("order:pay", data)
        },
        [order, paymentMethod, loading, totalValue]
    )

    useEffect(() => {
        io.on("pagseguro:paid", (data) => {
            const id = data.id
            const charge = data.charge
            console.log(id)

            if (id == order?.id) {
                console.log(charge)
                setLoading(false)

                if (charge.status == "PAID") {
                    navigate("/paid", {
                        state: {
                            data: {
                                order,
                                date: new Date(charge.paid_at),
                                installments: charge.payment_method?.installments,
                                method: paymentMethod,
                                type: charge.payment_method.type,
                                card: charge.payment_method.card,
                            },
                        },
                    })
                    settings.onPaid(charge)
                } else {
                    snackbar({ severity: "error", text: charge.payment_response.message })
                }
            }
        })

        io.on("qrcode", (data: QrCode) => {
            setLoading(false)
            console.log(data)
            navigate("/pix", { state: { data: { order, qrcode: data } } })
        })

        io.on("pagseguro:boleto", (data) => {
            setLoading(false)
            console.log(data)
            navigate("/boleto", {
                state: {
                    data: {
                        ...data.boleto,
                        link: data.links.find((link: { href: string; media: string }) => link.media == "application/pdf").href,
                        order,
                    },
                },
            })
        })

        return () => {
            io.off("pagseguro:paid")
            io.off("qrcode")
            io.off("pagseguro:boleto")
        }
    }, [order, paymentMethod])

    useEffect(() => {
        if (order) {
            setTotalValue(Number(order.total))
        }
    }, [order])

    useEffect(() => {
        io.emit("order:get", { referenceId: orderId, store: settings.storeIdentifier })
        console.log({ orderId })

        io.on("order", (data) => {
            console.log(data)
            setOrder(data)
        })

        io.on("order:pay:success", () => {
            alert("pago")
            setLoading(false)
        })

        io.on("order:pay:error", (error) => {
            console.log(error)
            snackbar({ severity: "error", text: error.description })
            setLoading(false)
        })

        return () => {
            io.off("order")
            io.off("order:pay:success")
            io.off("order:pay:error")
        }
    }, [])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: colors.unactive,
                fontWeight: "bold",
                flexDirection: "column",
                overflow: "hidden",
                width: "100%",
                height: "100vh",
            }}
        >
            <LoadingOverlay open={loading} />
            <Header />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {(formikProps) => (
                    <Form>
                        <DebitAuthenticator {...(formikProps as FormikProps<CardForm>)} submit={handleSubmit} setLoading={setLoading} />
                        <Box
                            sx={{
                                flexDirection: "column",
                                gap: "2vw",
                                height: isMobile ? "100vh" : "90vh",
                                overflowX: "hidden",
                                overflowY: "auto",
                                width: "100%",
                            }}
                        >
                            <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            <Box
                                sx={{
                                    justifyContent: "space-between",
                                    flexDirection: isMobile ? "column" : "row",
                                    padding: isMobile ? "5vw 5vw 20vw" : "0 5vw",
                                    gap: isMobile ? "5vw" : "",
                                }}
                            >
                                <PaymentForm {...formikProps} paymentMethod={paymentMethod} />
                                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw", width: isMobile ? "100%" : "30%" }}>
                                    <OrderDetails order={order} />
                                    <PaymentDetails
                                        order={order}
                                        paymentMethod={paymentMethod}
                                        formikValues={formikProps.values}
                                        setInstallments={(value) => formikProps.setFieldValue("installments", value)}
                                    />
                                    <Button
                                        disabled={!order}
                                        type="submit"
                                        variant="contained"
                                        sx={{ padding: isMobile ? "4vw" : ".5vw", color: "white" }}
                                        endIcon={<LockIcon />}
                                    >
                                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "Finalizar compra"}
                                    </Button>
                                    <Box
                                        sx={{
                                            gap: isMobile ? "10vw" : "1vw",
                                            fontWeight: "normal",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Esta operação está sendo realizada no Brasil</p>
                                        <img src={brazilFlag} alt="Brasil" />
                                    </Box>
                                    <Box
                                        sx={{
                                            flexDirection: "column",
                                            textAlign: "center",
                                        }}
                                    >
                                        <p>Powered by BOZ</p>
                                        <p>
                                            {currentYear} © Direitos reservados - {app_version}
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
