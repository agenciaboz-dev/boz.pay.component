declare interface Order {
    id: number
    status: string
    date_created: string
    date_modified: string
    total: string
    customer_id: number
    order_key: string
    cart_hash: string

    pag_status: string
    error_status?: string

    billing: Billing
    shipping: Shipping
}

declare interface Billing {
    id: number
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
}

declare interface Shipping {
    id: number
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    phone: string

    cpf: string
    district: string
    number: string
}
