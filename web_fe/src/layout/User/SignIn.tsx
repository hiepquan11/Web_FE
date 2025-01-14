import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

function SignIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) =>{

        event.preventDefault();

        const loginRequest = {
            userName: username,
            password: password
        }
        
        try {
            const response = await fetch('http://localhost:8080/userAccount/login',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            if(!response.ok){
                throw new Error("Đăng nhập thất bại");
            }

            const data = await response.json();
            const {jwt} = data;
            localStorage.setItem('token',jwt);
            navigate("/")
            
        } catch (error) {   
            setError("Lỗi trong quá trình đăng nhập");
        }
       
    }
    
    return(
        <div className="max-w-2xl md:mx-auto mx-5 bg-white shadow-2xl rounded-lg h-auto md:mt-10 mt-36 mb-10 py-5">
            <div className="text-center">
                <h1 className="text-lg font-semibold tracking-wide mb-2">ĐĂNG NHẬP</h1>
            </div>
            <form className="text-center mx-20" onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Tên tài khoản" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="Mật khẩu" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className="text-sm font-semibold bg-blue-600 py-2 px-3 rounded-md text-white flex items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clip-rule="evenodd"/>
                    </svg>
                    Đăng nhập với Google
                </button>

                <br/>
                {error && <div className="text-red-500">
                        {error}
                    </div>}

                <button type="submit" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4">Đăng nhập</button>
                
            
                
                <h1 className="">Bạn chưa có tài khoản? <Link to={"/signup"} className="text-sm font-medium text-indigo-600">Đăng ký</Link></h1>
            </form> 
        </div>
    );
}

export default SignIn;