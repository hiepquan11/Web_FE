import { Dropdown } from "flowbite-react";
import RequireAdmin from "./RequireAdmin";
import React, { FormEvent, useEffect, useState } from "react"
import CategoryModel from "../../../../../Models/CategoryModel";
import { getAllCategories, getCategoryById } from "../../../../../Api/CategoryApi";
import LoadingData from "../../../../Utils/LoadingData";


const UpdateProduct: React.FC = () =>{

    const [product, setProduct] = useState({
        productId: 0,
        name:'',
        description:'',
        price: 0,
        quantity: 0,
        discount: 0,
        listImage:[
            {
              imageURL: [] as String[]
            }
        ],
        listCategory:[
            {
                categoryID:0 
            }
        ]

    });

    const [selectedImages, setSelectedImages] = useState<FileList>();
    const [listImages, setListImages] = useState<String[]>([]);
    const [listCategories, setListCategories] = useState<CategoryModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | 1>(1);
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState(true);

    const handleSubmit = async (event: FormEvent) =>{
        event.preventDefault();
        const token = localStorage.getItem('token')

        const formData = new FormData();
        const arrFile = Array.from(selectedImages || []);
        for(const file of arrFile){
            formData.append("file", file);
        }
        formData.append("name", product.name)
        try {
            const imageUrlResponse = await fetch('http://localhost:8080/api/upload',{
                method: "POST",
                headers:{
                    "Authorization": `Bearer ${token}`
                },
                body: formData
                
            });
            const dataResponse = await imageUrlResponse.json();
            setListImages(dataResponse.body);

            const updatedProduct = {
                ...product, listImage: listImages.map(url => ({imageURL: url}))
            }            
            const productResponse = await fetch('http://localhost:8080/api/addProduct',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedProduct)
            })
            if(productResponse.ok){
                setLoading(false);
                setNotify(true)
                alert("Thêm sản phẩm thành công!")
                setProduct({
                    productId: 0,
                    name:'',
                    description:'',
                    price: 0,
                    quantity: 0,
                    discount: 0,
                    listImage:[
                        {
                            imageURL: []
                        }
                    ],
                    listCategory:[{
                        categoryID: 0
                    }]
                })
            }
        } catch (error) {
            throw new Error("Failed to fetch: " + error)
        }
    }
    useEffect(() =>{
        try {
            getAllCategories().then(
                categories =>{
                    setListCategories(categories);
                }
            )
        } catch (error) {
            console.log(error)
        }
    },[])

    // if(loading){
    //     return(
    //         <div>
    //             <LoadingData/>
    //         </div>
    //     )
    // }

    

    const handleSelectedCategory = (selectedId: number) =>{
        if(selectedId > 0){
           setSelectedCategory(selectedId)
           setProduct((prevProduct) =>({
                ...prevProduct, listCategory: [
                    ...prevProduct.listCategory,
                    {categoryID: selectedCategory}
                ]
           }))
        } else{
            console.error("Category ID not found");
        }
    }


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) =>{
        const files = event.target.files;
        if(files){
            setSelectedImages(files);
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
        <Dropdown label="Loại sản phẩm" dismissOnClick={true}>
            {
                listCategories.map((category) =>(
                    <Dropdown.Item key={category.categoryId} onClick={() => handleSelectedCategory(category.categoryId)}>
                        {category.categoryName}
                    </Dropdown.Item>
                ))
            }
        </Dropdown>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        </form>

        <button type="submit" className="text-sm font-semibold bg-pink-600 py-2 px-3 rounded-md text-white hover:bg-indigo-600 mb-4">Thêm sản phẩm</button>
    </form>
</div>
    )
}

const UpdateProductPage = RequireAdmin(UpdateProduct)
export default UpdateProductPage;