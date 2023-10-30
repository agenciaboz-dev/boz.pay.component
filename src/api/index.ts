import axios from "axios"
import { url } from "./backend"

export const api = axios.create({
    baseURL: `http${url}/api`,
    timeout: 1000 * 10,
})
