import { useStateContext } from "../contexts/contextprovider";
import { Navigate, Outlet } from "react-router-dom";

export default function InitialLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to='/' />
    }
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}