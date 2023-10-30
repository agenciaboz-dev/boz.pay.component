import { useContext } from "react"
import TotalValueContext from "../contexts/totalValueContext"

export const useTotalValue = () => {
    const totalValueContext = useContext(TotalValueContext)
    const totalValue = totalValueContext.value
    const setTotalValue = totalValueContext.setValue

    return { totalValue, setTotalValue }
}
