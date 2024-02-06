import React from "react";
import ProductModel from "../../../Models/ProductModel";
interface ProductPropsInterface{
    product: ProductModel;
}
const ProductProps:React.FC<ProductPropsInterface> = (props) => {
    return(
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src=""
                    className="card-img-top"
                    alt={props.product.ProductName}
                    style={{ height: '200px' }}
                />
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