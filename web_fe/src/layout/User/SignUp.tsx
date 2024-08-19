import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select, { SingleValue } from 'react-select';
import UserModel from "../../Models/UserModel";

interface Province{
    value: string;
    label: string;
}

interface District{
    value: string;
    label: string;
}

function SignUp(){

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [user, setUser] = useState<UserModel>();

    useEffect(() =>{
        async function fetchProvince() {
            try {
                const response = await fetch('https://vapi.vnappmob.com/api/province/');
                const data = await response.json();

                const formattedProvince: Province[] = data.results.map((province: any) => ({
                    value: province.province_id,
                    label: province.province_name
                }));

                setProvinces(formattedProvince);
            } catch (error) {
                console.log("error fetching province: ", error);
            }
        }
        fetchProvince();
    },[])

    useEffect(() =>{
        async function fetchDistrict() {
            try {
                const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`);
                const data = await response.json();
                
                const formattedDistrict: District[] = data.results.map((district: any) =>({
                    value: district.district_id,
                    label: district.district_name
                }));
                setDistricts(formattedDistrict)
            } catch (error) {
                console.log("error fetching district: ", error)
            }
        }
        if(selectedProvince){
            fetchDistrict();
            setSelectedDistrict(null);
        }
    },[selectedProvince])

    const handleSelectedProvince = (selectedID: SingleValue<Province>) =>{
        setSelectedProvince(selectedID ? selectedID.value : null);
        console.log(selectedProvince);
    }

    const handleSelectedDistrict = (selectedID: SingleValue<District>) =>{
        setSelectedDistrict(selectedID ? selectedID.value : null);
    }

    return(
        <div className="max-w-xl md:mx-auto mx-5 bg-white shadow-2xl rounded-lg h-auto md:mt-10 mt-36 mb-10 py-5">

        <div className="text-center">
            <h1 className="text-lg font-semibold tracking-wide mb-2">ĐĂNG KÝ</h1>
        </div>

        <div className="text-center mx-20">
            <input type="text" name="fullname" placeholder="Họ tên" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5"/>

            <input type="text" name="username" placeholder="Tên tài khoản" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5"/>

            <input type="email" name="email" placeholder="Email" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5"/>

            <input type="tel" name="phonenumber" placeholder="Số điện thoại" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5"/>
           
            <div className="flex space-x-4 mb-6">
                <Select options={provinces} className="w-1/2" placeholder="Tỉnh/Thành phố" onChange={handleSelectedProvince}/>

                <Select options={districts} className="w-1/2" placeholder="Quận/Huyện" onChange={handleSelectedDistrict} value={districts.find(d => d.value === selectedDistrict) || null} />
            </div>


            <br/>

            <input type="password" name="password" placeholder="Mật khẩu" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5"/>

            <input type="password" name="confirm-password" placeholder="Xác nhận mật khẩu" className="w-full py-3 rounded-md shadow-2xl mb-8 pl-5"/>

            <br/>

            <input type="button" value="Đăng ký" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4"/>

            <br/>

            <h1 className="">Bạn đã có tài khoản?<Link to={"/signin"} className="text-sm font-medium text-indigo-600">Đăng nhập</Link></h1>
        </div>
    </div>
    )
}
export default SignUp;