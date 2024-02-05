import React from "react";
import Product from "../../Models/Product";
import ProductProps from "./Components/ProductProps"

const ListProduct: React.FC = () => {
    const product: Product[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: 'https://titv.vn/../images/books/1.png',
        }
    ];
    return(
        <div className="container">
            <div className="row mt-4">
                {
                    product.map((product) => (
                        <ProductProps key = {product.id} product={product}></ProductProps>
                    )
                        
                    )
                }
            </div>
        </div>
    );
}
export default ListProduct;