import React, { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import ImageModel from "../../../Models/ImageModel";
import { getAllImage } from "../../../Api/ImageApi";

interface CouraselItemInterface{
    product: ProductModel;
}
const CouraselItem: React.FC<CouraselItemInterface> = (props) => {
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
        <div className="row align-items-center">
                      <div className="col-5 text-center">
                          <img src={imageData} className="float-end"/>
                      </div>
                      <div className="col-7">
                          <h5>{props.product.ProductName}</h5>
                          <p>{props.product.Description}</p>
                      </div>
                  </div>
    );
}
export default CouraselItem;