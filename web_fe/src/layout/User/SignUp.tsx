import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select, { SingleValue } from 'react-select';

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
    const [user, setUser] = useState({
        fullname:'',
        username:'',
        email:'',
        phonenumber:'',
        province: '',
        district: '',
        password:'',
        confirmpassword:''
    })
    const [validateError, setValidateError] = useState<string | null>(null);
    const [notify, setNotify] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) =>{
        event.preventDefault();

        //validate 

       let error: string | null = '';
       const phoneRegex = /^[0-9]{10}$/;
       const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
       const checkUsername = await checkExistUsername(user.username);
       const checkEmail = await checkExistEmail(user.email);

        if (!user.fullname || !user.username || !user.email || !user.phonenumber || !user.province || !user.district || !user.password || !user.confirmpassword) {
            error = "Vui lòng điền đầy đủ thông tin";
            setNotify(null);
        } else if (checkUsername) {
            error = "Username đã được sử dụng";
            setNotify(null);
        } else if (checkEmail) {
            error = "Email đã được sử dụng";
            setNotify(null);
        } else if (!phoneRegex.test(user.phonenumber)) {
            error = "Số điện thoại không hợp lệ";
            setNotify(null);
        } else if (!passwordRegex.test(user.password)) {
            error = "Mật khẩu phải có ít nhất 8 ký tự và có ít nhất 1 ký tự đặc biệt";
            setNotify(null);
        } else if (user.password !== user.confirmpassword) {
            error = "Mật khẩu không khớp";
            setNotify(null);

        }
        
        console.log(user)
        if(error){
            setValidateError(error);
        } else {
            setValidateError(null);
            //send data
            try {
                const response = await fetch('http://localhost:8080/userAccount/register',{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: user.fullname,
                        phoneNumber: user.phonenumber,
                        userName: user.username,
                        email: user.email,
                        address: `${user.province},${user.district}`,
                        password: user.password
                    })
                });

                if(response.ok){
                    setNotify("Đăng ký thành công!");
                    setValidateError(null);
                } else {
                    setNotify("Đăng ký thất bại!")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setUser({...user, [event.target.name]: event.target.value})
    }

    const checkExistUsername = async(username: string) =>{
        try {
            const response = await fetch(`  `);
            const data = await response.text();
            if(data === "true"){
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error can not check username: ", error)
            return false;
        }
    }

    const checkExistEmail = async(email:string) =>{
        try {
            const response = await fetch(`http://localhost:8080/user/search/existsByEmail?email=${email}`);
            const data = await response.text()
            if(data === "true"){
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error can not check usename: ", error);
            return false;
        }
    }

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
        setUser({...user, province: selectedID ? selectedID.label : ''});
    }

    const handleSelectedDistrict = (selectedID: SingleValue<District>) =>{
        setSelectedDistrict(selectedID ? selectedID.value : null);
        setUser({...user, district: selectedID ? selectedID.label : ''})
    }

    return(
        <div className="max-w-xl md:mx-auto mx-5 bg-white shadow-2xl rounded-lg h-auto md:mt-10 mt-36 mb-10 py-5">
            <div className="text-center">
                <h1 className="text-lg font-semibold tracking-wide mb-2">ĐĂNG KÝ</h1>
            </div>

            

            <form onSubmit={handleSubmit} className="text-center mx-20">
                <input type="text" name="fullname" placeholder="Họ tên" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" onChange={handleChange}/>
                

                <input type="text" name="username" placeholder="Tên tài khoản" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" onChange={handleChange}/>

                <input type="email" name="email" placeholder="Email" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" onChange={handleChange}/>

                <input type="tel" name="phonenumber" placeholder="Số điện thoại" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" onChange={handleChange}/>
                
                <div className="flex space-x-4 mb-6">
                    <Select options={provinces} className="w-1/2" placeholder="Tỉnh/Thành phố" onChange={handleSelectedProvince} />
                    <Select options={districts} className="w-1/2" placeholder="Quận/Huyện" onChange={handleSelectedDistrict} value={districts.find(d => d.value === selectedDistrict) || null} />
                </div>

                <input type="password" name="password" placeholder="Mật khẩu" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" onChange={handleChange}/>

                <input type="password" name="confirmpassword" placeholder="Xác nhận mật khẩu" className="w-full py-3 rounded-md shadow-2xl mb-8 pl-5" onChange={handleChange}/>

                <div className="text-center mx-20">
                    {validateError && (
                        <div className="text-red-500 text-lg mb-4">
                            {validateError}
                        </div>
                    )}
                    {notify && (
                        <div className="text-green-500 text-lg mb-4">
                            {notify}
                        </div>
                    )}
                </div>
              

                <button type="submit" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4">Đăng ký</button>
               
                
                <h1 className="">Bạn đã có tài khoản? <Link to={"/signin"} className="text-sm font-medium text-indigo-600">Đăng nhập</Link></h1>
            </form> 
        </div>
    )
}
export default SignUp;