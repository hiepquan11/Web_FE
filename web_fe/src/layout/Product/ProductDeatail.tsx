import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductModel from "../../Models/ProductModel";
import { getProductById } from "../../Api/ProductApi";
import LoadingData from "../Utils/LoadingData";
import { getCategoryByProductID } from "../../Api/CategoryApi";
import CategoryModel from "../../Models/CategoryModel";
import ImageModel from "../../Models/ImageModel";
import { getAllImage } from "../../Api/ImageApi";
import { addToCart } from "../../Api/CartApi";

interface CartItem{
    id: number;
    productImageUrls: string,
    productId: number,
    productQuantity: number,
    price: number,
    totalPrice: number
}

function ProductDetail(){

   const {productID} = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [category, setCategory] = useState<CategoryModel | null>(null);
    const [listImage, setListImage] = useState<ImageModel[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);

    let paramsProductId = 0;
    try {
         paramsProductId = parseInt(productID+'');
        if(Number.isNaN(paramsProductId)){
            paramsProductId = 0;
        }
    } catch (error) {
        paramsProductId = 0;
        console.log(error);
    }

    const increaseQuantity = () =>{
        const stockQuantity = (product && product.Quantity ? product.Quantity : 0);
        if(quantity < stockQuantity){
            setQuantity(quantity + 1);
        }
    }

    const reduceQuantity = () =>{
        if(quantity >= 2){
            setQuantity(quantity - 1);
        }
    }

    const handleAddToCart = async (productId: number, quantity: number, imageUrl: string, price: number, totalPrice: number) => {
        try {
            const token : string | null = localStorage.getItem('token');
            if(token === null){
                // Kiểm tra giỏ hàng trong localStorage
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingProductIndex = cart.findIndex((item: CartItem) => item.productId === productId);
            
            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã có, tăng số lượng
                cart[existingProductIndex].quantity += quantity;
            } else {
                // Nếu chưa có sản phẩm, thêm mới
                cart.push({ productId, quantity, imageUrl, price, totalPrice });
            }
    
            // Cập nhật lại giỏ hàng trong localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
    
            alert("Product added to cart!");
            } else {
                const responseData = await addToCart(productId, quantity, token);
                if(responseData){
                    alert("Product added to cart");
                }
            }
            
        } catch (error: any) {
            console.error("Error adding product to cart:", error.message);
            alert("Error adding product to cart!");
        }
    };

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newQuantity = parseInt(event.target.value);
        const stockQuantity = (product && product.Quantity ? product.Quantity : 0);
        if(!isNaN(newQuantity) && newQuantity >=1 && newQuantity <= stockQuantity){
            setQuantity(newQuantity);
        }
    }

    useEffect(() =>{
        getProductById(paramsProductId).then(
            productData =>{
                setProduct(productData);
                setLoadData(false);
            }
        ).catch(
            error =>{
                setLoadData(false);
                setError(error.message);
            }
        )
    },[paramsProductId])

    useEffect(() =>{
        getCategoryByProductID(paramsProductId).then(
            categoryData =>{
                setCategory(categoryData);
                setLoadData(false);
            }
        ).catch(
            error =>{
                setError(error.message);
            }
        )
    },[paramsProductId])

    useEffect(() =>{
        getAllImage(paramsProductId).then(
            imageData =>{
                setListImage(imageData);
            }
        ).catch(
            error =>{
                setError(error.message);
            }
        )
    },[paramsProductId])

    if(loadData){
        return(
            <LoadingData/>
        );
    }

    if(error){
        return(
            <div>
                <h1>Error: {error}</h1>
            </div>
        );
    }


    return(
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center p-4'>
        <div className='flex flex-col gap-6 lg:w-2/4 items-center'>
            {listImage.length > 0 ? (
                <>
                    <img 
                        src={listImage[0].ImageUrl} 
                        alt="Main product" 
                        className='max-w-[300px] max-h-[300px] w-full h-full aspect-square object-cover rounded-xl'
                    />
                    <div className='flex flex-row justify-between h-24'>
                        {listImage.slice(1, 5).map((imageSrc, index) => (
                            <img 
                                key={index} 
                                src={imageSrc.ImageUrl} 
                                alt={`Thumbnail ${index + 1}`} 
                                className='w-24 h-24 rounded-md cursor-pointer'
                            />
                        ))}
                    </div>
                </>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        {/* ABOUT */}
        <div className='flex flex-col gap-4 lg:w-2/4'>
            <div>
                <span className=' text-violet-600 font-semibold'>{category?.categoryName}</span>
                <h1 className='text-3xl font-bold'>{product?.ProductName}</h1>
            </div>
            <p className='text-gray-700'>{product?.Description}</p>
            <h6 className='text-2xl font-semibold'>{product?.Price.toLocaleString('vi-VN')}&#8363;</h6>
            <div className='flex flex-row items-center gap-12 justify-center'>
                <div className='flex flex-row items-center'>
                    <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={reduceQuantity}>-</button>
                    <span className='py-4 px-6 rounded-lg text-3xl text-center'>{quantity}</span>
                    <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={increaseQuantity}>+</button>
                </div>
                <button className='bg-yellow-300 text-black font-semibold py-3 px-16 rounded-xl h-full'
                    onClick={() => {
                        if(product?.ProductID && product.ImageUrls.length > 0 && product.ImageUrls[0]){
                            handleAddToCart(product.ProductID, quantity, product.ImageUrls[0], product.Price, product.Price * quantity)
                        } else {
                            console.log("ProductId is missing or invalid: ", product?.ProductID)
                        }
                    }}
                >Add to Cart</button>
            </div>
        </div>
    </div>
    );
}
export default ProductDetail;