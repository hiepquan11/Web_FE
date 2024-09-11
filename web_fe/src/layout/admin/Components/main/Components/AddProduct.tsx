import { FormEvent, useState } from "react"

const AddProduct: React.FC = () =>{
    const [product, setProduct] = useState({
        productId: 0,
        name:'',
        description:'',
        price: 0,
        quantity: 0,
        discount: 0,

    })

    const handleSubmit = async (event: FormEvent) =>{
        event.preventDefault();
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:8080/product',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(product)
            })
            if(response.ok){
                alert('thanh cong');
                setProduct({
                    productId: 0,
                    name:'',
                    description:'',
                    price: 0,
                    quantity: 0,
                    discount: 0,
                })
            } else {
                alert('that bai')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen pl-52">
             
                <h1 className="text-lg font-semibold tracking-wide mb-2">Thêm sản phẩm</h1>
            
            <form onSubmit={handleSubmit} className="text-center mx-20">
                <input type="text" name="productname" placeholder="Tên sản phẩm" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
                

                <input type="number" name="price" placeholder="Giá" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.price} onChange={(e) => setProduct({...product, price: parseInt(e.target.value)})} />

                <input type="text" name="description" placeholder="Mô tả" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} />

                <input type="number" name="discount" placeholder="Giảm giá" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.discount} onChange={(e) => setProduct({...product, discount: parseInt(e.target.value)})} />
                 <input type="number" name="quantity" placeholder="Số lượng" className="w-full py-3 rounded-md shadow-2xl mb-6 pl-5" value={product.quantity} onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value)})} />

                
                <div className="flex space-x-4 mb-6">
                    

                </div>

                <button type="submit" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4">Thêm sản phẩm</button>
            </form>
        </div>
       
            
    )
}
export default AddProduct;