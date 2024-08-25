import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActivationPage(){

    const {email} = useParams();
    const {activationCode} = useParams();
    const [isEnable, setIsEnable] = useState(false);
    const [notify, setNotify] = useState("");

    useEffect(() =>{
        if(email && activationCode){
            handleActivate();
        }
    },[])
    

    const handleActivate = async () => {
        try {
            const url: string = `http://localhost:8080/userAccount/activate?email=${email}&activationCode=${activationCode}`;
            const response = await fetch(url, {
                method: "GET"
            });

            if (response.ok) {
                setIsEnable(true);
            } else {
                const error = await response.json();
                setNotify(error.content);
            }
        } catch (error) {
            console.log(error)
        }
    };
    return(
        <div className="">
            <div className="bg-white max-w-2xl mx-auto items-center md:mt-10 mt-36 mb-10 py-5 rounded-lg shadow-2xl h-auto">
                <div>
                    <h1>KÍCH HOẠT TÀI KHOẢN</h1>
                </div>
                {
                    isEnable ? (
                        <div className="text-green-500 flex flex-col justify-center items-center">
                            <img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/order_status/ico_successV2.svg?q=10311" alt="success" />
                            <p>Kích hoạt tài khoàn thành công</p>
                        </div>
                    ) : (
                        <div className="text-red-500 flex flex-col justify-center items-center">
                            <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" alt="fail" width={100}/>
                            <p>{notify}</p>
                        </div>
                    )
                }
            </div>
        </div>
            
    )
}
export default ActivationPage;