import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <LoadingSpinner />;
    }

    return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>;
}
 
export default PrivateRoute;