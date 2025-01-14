import CategoryModel from "./CategoryModel";
import ImageModel from "./ImageModel";

class ProductResponse{
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: Array<ImageModel>
    productCategory: Array<CategoryModel>

    constructor(productId: number,
        productName: string,
        productDescription: string,
        productPrice: number,
        productImage: Array<ImageModel>,
        productCategory: Array<CategoryModel>
    ){
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productCategory = productCategory;
    }
}
export default ProductResponse;