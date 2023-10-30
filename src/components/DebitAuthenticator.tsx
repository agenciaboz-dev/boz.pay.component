import React, { useEffect } from "react"
import { useIo } from "../hooks/useIo"
import { useTotalValue } from "../hooks/useTotalValue"
import { FormikProps } from "formik"
import { authenticate } from "../tools/pagseguro_script"
import { useSnackbar } from "burgos-snackbar"

export const DebitAuthenticator: React.FC<FormikProps<CardForm> & { submit: (values: CardForm) => void; setLoading: (loading: boolean) => void }> = ({
    values,
    submit,
    setLoading,
}) => {
    const io = useIo()
    const { totalValue } = useTotalValue()
    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("pagseguro:3ds", async (session: PagseguroSession) => {
            const authentication = await authenticate(session, values as CardForm, totalValue)
            console.log(authentication)

            if (authentication.status == "AUTH_NOT_SUPPORTED") {
                setLoading(false)
                snackbar({ severity: "error", text: "Cartão não elegível ao pagamento online via débito" })
                return
            }

            submit({ ...values, auth: authentication.id })
        })

        return () => {
            io.off("pagseguro:3ds")
        }
    }, [totalValue, values])

    return <></>
}
