const cpf = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
const phone = ["(", /\d/, /\d/, ")", " ", /\d/, " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
const date = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
const cep = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]
const cardNumber = [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/]
const expiry = [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]

export default { cpf, phone, date, cep, cardNumber, expiry }
