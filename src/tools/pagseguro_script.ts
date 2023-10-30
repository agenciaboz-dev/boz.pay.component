import { splitPhoneNumber } from "./splitPhoneNumber"

// returns PAID
// Número: 4539620659922097
// Cód. de Seg.: 123
// Data Exp.:12/2026

// returns DECLINED
// Número: 4929291898380766
// Cód. de Seg.: 123
// Data Exp.:12/2026

// DEBIT CARDS
// success without challenge
// 4000000000002370
// success with challenge
// 5200000000001096
// fail
// 4000000000002719

export const encrypt = (card: Card): Promise<string> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        document.body.appendChild(script) // Appending the script to the body

        script.src = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
        script.async = true

        script.onload = () => {
            console.log("encrypting")
            const expiryMonth = card.expiry.split("/")[0]
            const expiryYear = card.expiry.split("/")[1]

            // @ts-ignore
            const pagseguro_card = window.PagSeguro?.encryptCard({
                // sandbox
                // publicKey:
                //     "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB",
                // production
                publicKey:
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApv7yDaw4aK+JNxjhxH7P1eTxZvoMfL2S4RifLUUB0+KBlN6uvKVj40wiBhLH7O9EPZeoVdApoK0M78Kol9LT3LYU4jQ0dFeeTeD/NV3AUguVBdJdIu8cUs0+oVvWAB4e0niEgax480x/Go7XG1ffvYAaYkO5FTeEH4qrwbz13a4ALPZ93ge6c6xZVspzAZc+WVnxcLeeoMoD4xz8DZS2LbqwOF9ee8Pcb8ybdr8p0vJL056Kb8AKYZ1mZ88nsdIqmR1jZ+BqRH6zMHW6UCVX6NgqWPkwemsfr2R5S+1EnHGH7ZAiUtRzCpejGVV33PIgOlb7j4JcCvQ6YP07AiiF3QIDAQAB",
                holder: card.cardOwner,
                number: card.cardNumber.replace(/\D/g, "").replace(/\s/g, ""),
                expMonth: expiryMonth,
                expYear: expiryYear,
                securityCode: card.cvv,
            })

            document.body.removeChild(script)
            resolve(pagseguro_card.encryptedCard) // Resolve the Promise with the encrypted card
        }

        script.onerror = () => {
            reject(new Error("Failed to load the PagSeguro script")) // Reject the Promise on error
        }

        // Set a timeout to reject the Promise if the script doesn't load within a certain timeframe (e.g., 15 seconds)
        setTimeout(() => {
            reject(new Error("PagSeguro script loading timed out"))
        }, 15000)
    })
}

export const authenticate = (session: PagseguroSession, order: CardForm, totalValue: number): Promise<PagseguroAuth> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        document.body.appendChild(script) // Appending the script to the body

        script.src = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
        script.async = true

        script.onload = () => {
            console.log("authenticating")

            const phone = splitPhoneNumber(order.phone)
            const expiryMonth = order.expiry.split("/")[0]
            const expiryYear = order.expiry.split("/")[1]

            const request = {
                data: {
                    customer: {
                        name: order.name,
                        email: order.email,
                        phones: [
                            {
                                country: "55",
                                area: phone.areaCode,
                                number: phone.number,
                                type: "MOBILE",
                            },
                        ],
                    },
                    paymentMethod: {
                        type: "DEBIT_CARD",
                        installments: 1,
                        card: {
                            number: order.cardNumber,
                            expMonth: expiryMonth,
                            expYear: expiryYear,
                            holder: {
                                name: order.cardOwner,
                            },
                        },
                    },
                    amount: {
                        value: Math.round(totalValue * 100),
                        currency: "BRL",
                    },
                    billingAddress: {
                        street: order.address,
                        number: order.address,
                        complement: order.complement || "não informado",
                        regionCode: order.state,
                        country: "BRA",
                        city: order.city,
                        postalCode: order.postcode.replace(/\D/g, ""),
                    },
                    shippingAddress: {
                        street: order.address,
                        number: order.address,
                        complement: order.complement || "não informado",
                        regionCode: order.state,
                        country: "BRA",
                        city: order.city,
                        postalCode: order.postcode.replace(/\D/g, ""),
                    },
                    dataOnly: false,
                },
            }

            // @ts-ignore
            window.PagSeguro?.setUp({
                session: session.session,
                env: "PROD",
            })

            console.log(request)

            // @ts-ignore
            window.PagSeguro?.authenticate3DS(request)
                .then((result: any) => {
                    console.log("authenticated")
                    resolve(result) // Resolve the Promise with the encrypted card
                })
                .catch((error: any) => {
                    console.log(error.detail)
                    reject(error)
                })
                .finally(() => {
                    document.body.removeChild(script)
                })
        }

        script.onerror = () => {
            reject(new Error("Failed to load the PagSeguro script")) // Reject the Promise on error
        }

        // Set a timeout to reject the Promise if the script doesn't load within a certain timeframe (e.g., 15 seconds)
        // setTimeout(() => {
        //     reject(new Error("PagSeguro script loading timed out"))
        // }, 15000)
    })
}
