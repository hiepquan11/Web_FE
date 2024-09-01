import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"

const TestDecodeJwt = () =>{

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData){
                setUsername(userData.sub + '');
            }
        }
    },[])
    return (
        <div>
            {username && <div>
                    {username}
                </div>}
        </div>
    )
}
export default TestDecodeJwt;