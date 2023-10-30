import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Box, ThemeProvider, useMediaQuery } from "@mui/material"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import { DarkModeProvider } from "./contexts/darkModeContext"

const Themed = () => {
    const theme = useMuiTheme()
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box sx={{ fontSize: isMobile ? "" : "1vw" }}>
                    <Providers>
                        <Routes />
                    </Providers>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

const App = () => {
    Notification.requestPermission()
    
    return (
        <DarkModeProvider>
            <Themed />
        </DarkModeProvider>
    )
}

export default App
