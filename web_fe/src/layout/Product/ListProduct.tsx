import React, { useEffect, useState } from "react";
import ProductProps from "./Components/ProductProps"
import ProductModel from "../../Models/ProductModel";
import { GetAllProduct } from "../../Api/ProductApi";

const ListProduct: React.FC = () => {
  
    const[listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadData, setData] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        GetAllProduct().then(
            productData =>{
                setListProduct(productData);
                setData(false);
            }
        ).catch(
           error =>{
            setData(false);
            setError(error.message);
           }
        );
    },[])


    if(loadData){
        return(
        <div>
            <h1>Load data</h1>
        </div>)
    }
    if(error){
        return(
        <div><h1>Error: ${error}</h1></div>)
    }

    return(


        <div className="container">
            <div className="row mt-4">
                {
                    listProduct.map((product) => (
                        <ProductProps key = {product.ProductID} product={product}></ProductProps>
                    )
                    )
                }
            </div>
        </div>
    );
}
export default ListProduct;