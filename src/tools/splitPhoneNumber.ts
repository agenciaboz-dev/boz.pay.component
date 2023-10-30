export const splitPhoneNumber = (phone: string): { areaCode: string; number: string } => {
    const matches = phone.match(/\((\d{2})\)\s(\d{5}-\d{4})/)
    if (!matches) {
        throw new Error("Invalid phone format")
    }
    return {
        areaCode: matches[1],
        number: matches[2].replace(/\D/g, ""),
    }
}
