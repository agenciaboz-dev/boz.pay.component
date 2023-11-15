declare interface Order {
    id: number
    referenceId: string
    store: string
    status: string
    dateCreated: string
    dateModified: string
    total: number
    customerId?: string
    pag_error?: string

    billing: Billing
    shipping: Shipping
    products: Product[]
    woocommerce?: Woocommerce
}



declare interface Product {
    id: number
    name: string
    price: number
    quantity: number
    referenceId: string
}

declare interface Address {
    id: number
    address: string
    district: string
    city: string
    state: string
    postcode: string
    number: string
    complement?: string
}

declare interface PersonalData {
    id: number
    name: string
    cpf: string
    phone: string
    email: string
}

declare interface Billing {
    id: number
    personalData: PersonalData
    address: Address
}

declare interface Shipping {
    id: number
    personalData: PersonalData
    address: Address
}

export type { Order, Product, Address, PersonalData, Billing, Shipping }