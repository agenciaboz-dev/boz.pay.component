export const splitPhoneNumber = (phone: string): { areaCode: string; number: string } => {
    const matches = phone.match(/\((\d{2})\)\s(\d{5}-\d{4})/)
    if (!matches) {
        return {
            areaCode: phone.slice(0, 2),
            number: phone.slice(2),
        }
    }
    return {
        areaCode: matches[1],
        number: matches[2].replace(/\D/g, ""),
    }
}
