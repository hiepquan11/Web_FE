import React, { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import ImageModel from "../../../Models/ImageModel";
import { getAllImage } from "../../../Api/ImageApi";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../Api/ProductApi";

const ProductDetail:React.FC = () => {

    const[product, setProduct] = useState<ProductModel | null>(null);
    const[loadingData, setLoadingData] = useState(true);
    const[error, setError] = useState(null);
    const {productId} = useParams();


    let productNumber = 0;
    try {
        productNumber = parseInt(productId + "");
        if(Number.isNaN(productNumber))
            productNumber = 0;
    } catch (error) {
        productNumber = 0;
        console.log("Error: ", error);
    }

   useEffect(()=>{
    getProductById(productNumber)
    .then((product) =>{
        setProduct(product);
        setLoadingData(false);
    })
    .catch((error) =>{
        setError(error.message);
        setLoadingData(false);
    })
   },[])

   if(!product){
    return(
        <div>
            Không có sách
        </div>
    );
   }
   
    return(
        <div>
            <h1>
                {product.ProductName}
            </h1>
        </div>
    );
}
export default ProductDetail;