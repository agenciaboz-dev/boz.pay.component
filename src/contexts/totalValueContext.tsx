import { createContext, useState } from "react"
import React from "react"

interface TotalValueContextContextValue {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

interface TotalValueContextProviderProps {
    children: React.ReactNode
}

const TotalValueContextContext = createContext<TotalValueContextContextValue>({} as TotalValueContextContextValue)

export default TotalValueContextContext

export const TotalValueContextProvider: React.FC<TotalValueContextProviderProps> = ({ children }) => {
    const [value, setValue] = useState<number>(0)

    return <TotalValueContextContext.Provider value={{ value, setValue }}>{children}</TotalValueContextContext.Provider>
}
