import { error } from "console";
import Select from "react-select";
import { FormEvent, useState } from "react"

const AddProduct: React.FC = ()=>{
    const [product, setProduct] = useState({
        productId: 0,
        productName: '',
        price: '',
        discount: 0,
        description:'',
        quantity:0
    })


    const handleSubmit = (event: FormEvent) =>{
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        }).then(
            (response) =>{
                if(response.ok){
                    alert('Them thanh cong');
                    setProduct({
                        productId: 0,
                        productName: '',
                        price: '',
                        discount: 0,
                        description:'',
                        quantity:0
                    })
                } else {
                    alert('That bai')
                }
            }
        ).catch(
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <div className="max-w-2xl md:mx-auto mx-5 bg-white shadow-2xl rounded-lg h-auto md:mt-10 mt-36 mb-10 py-5">
            <div className="text-center">
                <h1 className="text-lg font-semibold tracking-wide mb-2">THÊM SẢN PHẨM</h1>
            </div>
            <form className="text-center mx-20" onSubmit={handleSubmit}>
                <input type="text" name="productname" placeholder="Tên sản phẩm" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.productName} onChange={(e) => setProduct({...product, productName: e.target.value})} />
                

                <input type="number" name="price" placeholder="Giá" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} />

                <input type="text" name="description" placeholder="Mô tả" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} />

                <input type="number" name="quantity" placeholder="Số lượng" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.quantity} onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value)})} />
                
                <div className="flex space-x-4 mb-6">
                    <Select placeholder="Loại sản phẩm"/>

                </div>

                <button type="submit" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4">Thêm sản phẩm</button>
               
                
            </form> 
        </div>
    )
}
export default AddProduct;


