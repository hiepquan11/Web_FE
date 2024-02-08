import React, { useEffect, useState } from "react";
import './Courasel.css'
import ProductModel from "../../../Models/ProductModel";
import { getNewProduct } from "../../../Api/ProductApi";
import CouraselItem from "./CouraselItem";

const Courasel:React.FC = () => {
        const[listProduct, setListProduct] = useState<ProductModel[]>([])
        const[loadData, setLoadData] = useState(true);
        const[error, setError] = useState(null);

        useEffect(() => {
            getNewProduct().then(
                productData =>{
                    setListProduct(productData);
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
            return (
                <div><h1>Load data....</h1></div>
            );
        }
        if(error){
            return(
                <div><h1>Error: {error}</h1></div>
            );
        }

    return(
      <div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide mt-3">
          <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                    <CouraselItem key={0} product={listProduct[0]}></CouraselItem>
              </div>
              <div className="carousel-item " data-bs-interval="10000">
              <CouraselItem key={1} product={listProduct[1]}></CouraselItem>
              </div>
              {/* <div className="carousel-item " data-bs-interval="10000">
              <CouraselItem key={2} product={listProduct[2]}></CouraselItem>
              </div> */}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
      </div>
  </div>
    );
}
export default Courasel;