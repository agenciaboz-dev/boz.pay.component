import React from "react"
import { Box, CircularProgress, Dialog, useMediaQuery } from "@mui/material"
import { backdropStyle } from "../style/backdrop"
import LockIcon from "@mui/icons-material/Lock"

interface LoadingOverlayProps {
    open: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open }) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Dialog
            open={open}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{
                sx: {
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "100vw",
                    margin: 0,
                    height: "100vh",
                    maxHeight: "100vh",
                    width: "100vw",
                    background: "transparent",
                    justifyContent: "center",
                    gap: isMobile ? "8vw" : "2vw",
                    padding: isMobile ? "5vw" : "",
                    textAlign: "center",
                },
            }}
        >
            <Box sx={{ position: "relative", gap: isMobile ? "3vw" : "1vw" }}>
                <LockIcon sx={{ width: isMobile ? "15vw" : "7vw", height: isMobile ? "15vw" : "7vw" }} />
                <CircularProgress
                    size={isMobile ? "25vw" : "10vw"}
                    sx={{
                        position: "absolute",
                        top: isMobile ? "-5vw" : "-1.5vw",
                        left: isMobile ? "-5vw" : "-1.5vw",
                    }}
                />
            </Box>
            <h2>Aguarde um instante, seu pagamento está sendo processado com segurança...</h2>
            <h2 style={{ fontWeight: "normal", color: "black" }}>Por favor, não feche ou recarregue esta página.</h2>
        </Dialog>
    )
}
