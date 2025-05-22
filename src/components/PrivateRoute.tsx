import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

const PrivateRoute = ({children}) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <LoadingSpinner />;
    }

    return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>;
}
 
export default PrivateRoute;