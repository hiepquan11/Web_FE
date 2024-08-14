import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductModel from "../../Models/ProductModel";
import { getProductById } from "../../Api/ProductApi";

function ProductDetail(){

   const {productID} = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);
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
    },[])

    if(loadData){
        return(
            <h1>Loading data</h1>
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
        <div>
            <h1>{product?.ProductName}</h1>
        </div>
    );
}
export default ProductDetail;