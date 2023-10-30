export const getPaymentForm = (method: PaymentMethod, billing?: Billing, shipping?: Shipping) => {
    const notCard = {
        name: `${billing?.first_name || ""} ${billing?.last_name || ""}`,
        cpf: shipping?.cpf || "",
        phone: billing?.phone || "",
        email: billing?.email || "",

        postcode: billing?.postcode || "",
        address: billing?.address_1 || "",
        city: billing?.city || "",
        state: billing?.state || "",
        complement: billing?.address_2 || "",
        district: shipping?.district || "",
        number: shipping?.number || "",
    }

    const form: Record<PaymentMethod, CardForm | Form> = {
        card: {
            ...notCard,

            cardNumber: "",
            expiry: "",
            cvv: "",
            cardOwner: "",
            type: "credit",
            installments: 1,
        },
        boleto: notCard,
        pix: notCard,
    }

    return form[method]
}
