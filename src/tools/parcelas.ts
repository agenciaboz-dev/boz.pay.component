export const getParcelas = (value: number | string) => {
    const parcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const list = parcelas.map((parcela) => {
        const price = (Number(value) / parcela).toFixed(2).toString().replace(".", ",")
        const text = `x${parcela} de R$ ${price} sem juros`

        return { id: parcela, text }
    })

    return list
}
