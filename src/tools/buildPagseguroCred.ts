export const getCredentials = (settings: Settings, woocommerce?: Woocommerce) => {
    const sandbox = !!settings.sandbox || !!woocommerce?.sandbox
    const token = sandbox ? settings.pagseguroTokenSandbox || woocommerce?.pagSandboxToken : settings.pagseguroToken || woocommerce?.pagToken

    return { sandbox, token }
}
