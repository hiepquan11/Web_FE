import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom"
interface jwtPayLoad extends JwtPayload{
    exp?: number
}
function useCheckExpirationTime(){
    const navigate = useNavigate();

    const checkExpirationTime = () =>{

        const token : string | null = localStorage.getItem('token');
        
        if(!token){
            return false;
        }
        try {
            const decoded : jwtPayLoad = jwtDecode<jwtPayLoad>(token);
            if(!decoded.exp){
                console.error("token is not have time");
                return false;
            }
            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime){
                console.log("token is exprired")
                localStorage.removeItem("token")
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    checkExpirationTime();
}

export default useCheckExpirationTime;