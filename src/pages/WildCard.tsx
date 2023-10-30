import React from "react"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import colors from "../style/colors"

interface WildCardProps {}

export const WildCard: React.FC<WildCardProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                backgroundColor: colors.primary,
                color: "secondary.main",
                padding: "5vw",
                alignItems: "center",
                gap: "2vw",
            }}
        >
            <p style={{ fontSize: isMobile ? "30vw" : "20vw", fontWeight: "bold", marginTop: isMobile ? "30vw" : "" }}>404</p>
            <p style={{ fontSize: isMobile ? "6vw" : "2vw", fontWeight: "bold" }}>caminho não encontrado</p>
        </Box>
    )
}
