import { Billing } from "../definitions/Order"

export const getPaymentForm = (method: PaymentMethod, billing?: Billing) => {
    const notCard = {
        name: billing?.personalData.name || "",
        cpf: billing?.personalData.cpf || "",
        phone: billing?.personalData.phone || "",
        email: billing?.personalData.email || "",

        postcode: billing?.address.postcode || "",
        address: billing?.address.address || "",
        city: billing?.address.city || "",
        state: billing?.address.state || "",
        complement: billing?.address.complement || "",
        district: billing?.address.district || "",
        number: billing?.address.number || "",
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
