import { useContext } from "react"
import SettingsContext from "../contexts/settingsContext"

export const useSettings = () => {
    const settingsContext = useContext(SettingsContext)

    return { ...settingsContext }
}
