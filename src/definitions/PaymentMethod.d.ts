declare type PaymentMethod = "card" | "pix" | "boleto"

declare interface Form {
    name: string
    cpf: string
    phone: string
    email: string

    postcode: string
    address: string
    city: string
    state: string
    complement: string
    district: string
    number: string
}

declare interface Card {
    cardNumber: string
    expiry: string
    cvv: string
    cardOwner: string
    type: "credit" | "debit"
}

declare type CardForm = Form &
    Card & {
        installments: number
        auth?: string
    }
