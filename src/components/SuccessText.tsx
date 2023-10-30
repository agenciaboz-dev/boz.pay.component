import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import check from "../assets/check.svg"
import colors from "../style/colors"

interface SuccessTextProps {
    email: string
}

export const SuccessText: React.FC<SuccessTextProps> = ({ email }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box sx={{ flexDirection: "column", alignItems: "center", gap: isMobile? "5vw" : "0.5vw", width: "100vw", padding: isMobile? "5vw" : 0 }}>
            <Box sx={{ gap: isMobile? "5vw" : "0.5vw", alignItems: "center" }}>
                <img src={check} alt="Check" style={{ width: isMobile? "10vw" : "2vw" }} />
                <h3 style={{ color: colors.primary, textAlign: "center" }}>Sua transação foi concluída com sucesso!</h3>
            </Box>

            <p style={{ color: "black", fontWeight: "normal", textAlign: "center" }}>
                Acabamos de enviar os dados de seu pedido para o e-mail <span style={{ fontWeight: "bold" }}>{email}</span>.
            </p>
        </Box>
    )
}
