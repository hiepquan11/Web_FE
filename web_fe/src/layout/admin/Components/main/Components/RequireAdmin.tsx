import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export interface JwtPayload{
    id: any,
    role: string,
    enabled: boolean
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) =>{
    const WithCheckAdmin: React.FC<P> = (props) =>{
        const navigate = useNavigate();
        useEffect(() =>{
            const token = localStorage.getItem('token');

            if(!token){
                navigate("/signin");
                return;
            }

            const decodeToken = jwtDecode(token) as JwtPayload;
            const role = decodeToken.role;

            if(role !== "ADMIN"){
                navigate("/error-403")
            }
        },[navigate])
        return <WrappedComponent {...props}/>
    };
    return WithCheckAdmin || null;
}
export default RequireAdmin;