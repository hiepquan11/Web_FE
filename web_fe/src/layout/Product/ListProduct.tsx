import React, { useEffect, useState } from "react";
import ProductProps from "./Components/ProductProps"
import ProductModel from "../../Models/ProductModel";
import { GetAllProduct, findProductByName } from "../../Api/ProductApi";
import { Pagination } from "../Utils/Pagination";


interface ListProductProps{
    searchTerm: string,
}

function ListProduct({searchTerm}: ListProductProps) {

    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadData, setData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(searchTerm === ''){
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
        } else {
            findProductByName(searchTerm).then(
                productData => {
                    setListProduct(productData);
                    setData(false);
                }
            ).catch(
                error =>{
                    setData(false);
                    setError(error.message)
                }
            )
        }
    },[searchTerm])


    if(loadData){
        return(
        <div>
            <h1>Load data</h1>
        </div>)
    }
    if(error){
        console.log(error)
        return(
        <div><h1>Error: ${error}</h1></div>)
    }
    if(listProduct.length === 0){
        return(
            <div className="container">
                <div className="d-flex align-items-center justify-content-center fs-3">
                    <h1>Không tìm thấy tên sản phẩm !</h1>
                </div>
            </div>
        )
    }


    return(
        <div className="container flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
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