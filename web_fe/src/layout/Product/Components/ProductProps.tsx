import React, { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import ImageModel from "../../../Models/ImageModel";
import { getAllImage } from "../../../Api/ImageApi";
import { Link } from "react-router-dom";
interface ProductPropsInterface{
    product: ProductModel;
}
const ProductProps:React.FC<ProductPropsInterface> = (props) => {

    const productID:number = props.product.ProductID;
    const [listImage, setListImage] = useState<ImageModel[]>([]);
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        getAllImage(productID).then(
            imageData => {
                setListImage(imageData);
                setLoadData(false);
            }
        ).catch(
            error => {
                setLoadData(false);
                setError(error.message);
            }
        )
    },[])

    if(loadData){
        return(<div><h1>Load Data....</h1></div>);
        
    }
    if(error){
        return(
            <div><h1>Error: {error}</h1></div>
        );
    }

    let imageData:string="";
    if(listImage[0] && listImage[0].ImageData){
        imageData = listImage[0].ImageData;
    }
    return(
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`product/${props.product.ProductID}`}>
                    <img
                        src={imageData}
                        className="card-img-top"
                        alt={props.product.ProductName}
                        style={{ height: '320px' }}
                    />
                </Link>
               
                <div className="card-body">
                    <h5 className="card-title">{props.product.ProductName}</h5>
                    <p className="card-text">{props.product.Description}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.product.Price}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.product.Discount}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductProps