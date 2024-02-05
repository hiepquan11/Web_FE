import React from "react";
import Product from "../../../Models/Product";
interface ProductProps{
    product: Product;
}
const ProductProps:React.FC<ProductProps> = ({product}) => {
    return(
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{product.originalPrice}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{product.price}</strong>
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