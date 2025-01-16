class ProductModel {
    ProductID: number;
    ProductName: string;
    Description: string;
    Discount?: number;
    Price: number;
    Quantity: number;
    ImageUrls: Array<string>;
    CategoryNames: Array<string>
    
   
    
    
    constructor(ProductID: number,
        ProductName: string,
        Description: string,
        Discount: number,
        Price: number,
        Quantity: number,
        ImageUrls: Array<string>,
        CategoryNames: Array<string>
       ){

            this.ProductID = ProductID;
            this.Description = Description;
            this.Discount = Discount;
            this.Price = Price;
            this.ProductName = ProductName;
            this.Quantity = Quantity;
            this.ImageUrls = ImageUrls;
            this.CategoryNames = CategoryNames;
    }
}
export default ProductModel;