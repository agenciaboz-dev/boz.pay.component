import React from "react"
import { Box, FormControlLabel, Grid, Radio, RadioGroup, TextField, useMediaQuery } from "@mui/material"
import { FormikProps } from "formik"
import MaskedInput from "./MaskedInput"
import masks from "../tools/masks"
import { useSnackbar } from "burgos-snackbar"

interface PaymentFormProps {}

export const PaymentForm: React.FC<FormikProps<Form | CardForm> & { paymentMethod: PaymentMethod }> = ({
    values,
    handleChange,
    paymentMethod,
    setFieldValue,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { snackbar } = useSnackbar()

    const handleExpiryBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const value = event.target.value
        const [month, year] = value.split("/")
        if (year?.length == 2) {
            const expiry = `${month}/20${year}`
            setFieldValue("expiry", expiry)
        }

        if (month?.length == 2 && (Number(month) < 1 || Number(month) > 12)) {
            snackbar({ severity: "error", text: "Mês inválido" })
            setFieldValue("expiry", "")
        }
    }

    return (
        <Box
            sx={{
                flexDirection: isMobile ? "column" : "row",
                width: isMobile ? "90vw" : "60vw",
                gap: "2vw",
                paddingRight: isMobile ? 0 : "2vw",
            }}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    // flexWrap: "wrap",
                    gap: isMobile ? "5vw" : "2vw",
                    height: isMobile ? "auto" : "70vh",
                    width: isMobile ? "90vw" : paymentMethod == "card" ? "46.5%" : "100%",
                }}
            >
                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
                    <h3>DETALHES DE COBRANÇA</h3>
                    <TextField
                        label="Nome"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        // InputProps={{ readOnly: !!initialValues.name }}
                        required
                        size={isMobile ? "medium" : "small"}
                    />
                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <TextField
                                label="CPF"
                                name="cpf"
                                value={values.cpf}
                                onChange={handleChange}
                                InputProps={{
                                    // readOnly: !!initialValues.cpf,
                                    inputComponent: MaskedInput,
                                    inputProps: { mask: masks.cpf },
                                }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Telefone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                InputProps={{
                                    // readOnly: !!initialValues.phone,
                                    inputComponent: MaskedInput,
                                    inputProps: { mask: masks.phone },
                                }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        // InputProps={{ readOnly: !!initialValues.email }}
                        required
                        size={isMobile ? "medium" : "small"}
                    />
                </Box>
                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
                    <h3>ENDEREÇO</h3>
                    <TextField
                        label="Endereço"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        // InputProps={{ readOnly: !!initialValues.address }}
                        required
                        size={isMobile ? "medium" : "small"}
                    />
                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <TextField
                                label="Número"
                                name="number"
                                fullWidth
                                value={values.number}
                                onChange={handleChange}
                                // InputProps={{ readOnly: !!initialValues.number }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Complemento"
                                name="complement"
                                value={values.complement}
                                onChange={handleChange}
                                // InputProps={{ readOnly: !!initialValues.complement }}
                                fullWidth
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <TextField
                                label="CEP"
                                name="postcode"
                                value={values.postcode}
                                onChange={handleChange}
                                InputProps={{
                                    // readOnly: !!initialValues.postcode,
                                    inputComponent: MaskedInput,
                                    inputProps: { mask: masks.cep },
                                }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Bairro"
                                name="district"
                                fullWidth
                                value={values.district}
                                onChange={handleChange}
                                // InputProps={{ readOnly: !!initialValues.district }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1.5}>
                        <Grid item xs={9}>
                            <TextField
                                label="Cidade"
                                name="city"
                                fullWidth
                                value={values.city}
                                onChange={handleChange}
                                // InputProps={{ readOnly: !!initialValues.city }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Estado"
                                name="state"
                                fullWidth
                                value={values.state}
                                onChange={handleChange}
                                // InputProps={{ readOnly: !!initialValues.state }}
                                required
                                size={isMobile ? "medium" : "small"}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ gap: "1vw" }}></Box>
                </Box>
            </Box>
            {paymentMethod == "card" && (
                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "2vw", width: isMobile ? "100%" : "50%" }}>
                    <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
                        <h3>DADOS DO TITULAR DO CARTÃO</h3>
                        <TextField
                            label="Número do cartão"
                            name="cardNumber"
                            value={(values as CardForm).cardNumber || ""}
                            onChange={handleChange}
                            required
                            size={isMobile ? "medium" : "small"}
                        />
                        <TextField
                            label="Nome do titular"
                            name="cardOwner"
                            value={(values as CardForm).cardOwner || ""}
                            onChange={handleChange}
                            required
                            size={isMobile ? "medium" : "small"}
                        />
                        <TextField
                            fullWidth
                            label="Validade"
                            name="expiry"
                            value={(values as CardForm).expiry}
                            onChange={handleChange}
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: masks.expiry } }}
                            size={isMobile ? "medium" : "small"}
                            onBlur={handleExpiryBlur}
                        />
                        <TextField
                            fullWidth
                            label="Código de segurança"
                            name="cvv"
                            value={(values as CardForm).cvv}
                            onChange={handleChange}
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: "000" } }}
                            size={isMobile ? "medium" : "small"}
                        />
                    </Box>
                    <Box sx={{ flexDirection: "column", gap: "0.5vw" }}>
                        <h3>MODALIDADE DE PAGAMENTO</h3>
                        <RadioGroup
                            value={(values as CardForm).type || "credit"}
                            onChange={(_, value) => setFieldValue("type", value)}
                            sx={{
                                flexDirection: "row",
                                justifyContent: isMobile ? "space-around" : "start",
                                gap: isMobile ? 0 : "5vw",
                            }}
                        >
                            <FormControlLabel label="Crédito" control={<Radio value={"credit"} />} />
                            <FormControlLabel label="Débito" control={<Radio value={"debit"} />} />
                        </RadioGroup>
                    </Box>
                </Box>
            )}
        </Box>
    )
}
