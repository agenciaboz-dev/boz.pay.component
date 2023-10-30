declare interface PagseguroAuth {
    id: string
    status: string
}

declare interface PagseguroSession {
    session: string
    expires_at: number
}
