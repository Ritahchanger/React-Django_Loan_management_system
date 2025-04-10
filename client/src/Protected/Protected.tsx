import { Navigate } from "react-router-dom";


interface ProtectedRouteProps{

    children:React.ReactNode;

}


const ProtectedRoute = ({children}:ProtectedRouteProps)  => {


    const isAuthenticated = sessionStorage.getItem("authToken");

    return isAuthenticated ? children : <Navigate to="/login" replace />;

    
}

export default ProtectedRoute;