declare interface Settings {
    storeIdentifier: string

    pagseguroToken: string
    pagseguroTokenSandbox: string
    creditCardPublicKey: string
    referenceId: string | number
    onPaid: (charge: Charge) => void

    sandbox?: boolean
    params?: boolean
}
