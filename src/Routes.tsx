import { Route, Routes as ReactRoutes } from "react-router-dom"
import { WildCard } from "./pages/WildCard"
import { Pay } from "./pages/Pay"
import { Home } from "./pages/Home"
import { Paid } from "./pages/Paid"
import { Pix } from "./pages/Pix"
import { Boleto } from "./pages/Boleto"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {

    return (
        <ReactRoutes>
            <Route index element={<Pay />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/paid" element={<Paid />} />
            <Route path="/pix" element={<Pix />} />
            <Route path="/boleto" element={<Boleto />} />
            <Route path="*" element={<Pay />} />
        </ReactRoutes>
    )
}
