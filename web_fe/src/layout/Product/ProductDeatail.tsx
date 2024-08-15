import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductModel from "../../Models/ProductModel";
import { getProductById } from "../../Api/ProductApi";
import LoadingData from "../Utils/LoadingData";
import { getCategoryByProductID } from "../../Api/CategoryApi";
import CategoryModel from "../../Models/CategoryModel";

function ProductDetail(){

   const {productID} = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [category, setCategory] = useState<CategoryModel | null>(null);
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

    if(loadData){
        return(
            <LoadingData/>
        );
    }
    console.log(category)

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
            <img src="" alt="" className='max-w-[300px] max-h-[300px] w-full h-full aspect-square object-cover rounded-xl'/>
            <div className='flex flex-row justify-between h-24'>
                <img src="" alt="" className='w-24 h-24 rounded-md cursor-pointer'/>
                <img src="" alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                <img src="" alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                <img src="" alt="" className='w-24 h-24 rounded-md cursor-pointer'/>
            </div>
        </div>
        {/* ABOUT */}
        <div className='flex flex-col gap-4 lg:w-2/4'>
            <div>
                <span className=' text-violet-600 font-semibold'>{category?.categoryName}</span>
                <h1 className='text-3xl font-bold'>{product?.ProductName}</h1>
            </div>
            <p className='text-gray-700'>{product?.Description}</p>
            <h6 className='text-2xl font-semibold'>{product?.Price.toLocaleString('vi-VN')} &#8363;</h6>
            <div className='flex flex-row items-center gap-12'>
                <div className='flex flex-row items-center'>
                    <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl'>-</button>
                    <span className='py-4 px-6 rounded-lg'></span>
                    <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'>+</button>
                </div>
                <button className='bg-yellow-300 text-black font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
            </div>
        </div>
    </div>
    );
}
export default ProductDetail;