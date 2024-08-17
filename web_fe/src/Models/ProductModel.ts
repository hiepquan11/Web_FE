class ProductModel {
    ProductID: number;
    ProductName: string;
    Description: string;
    Discount?: number;
    Price: number;
    Quantity: number;
    Created_at: Date;
    Updated_at: Date;
    
    constructor(ProductID: number,
        ProductName: string,
        Description: string,
        Discount: number,
        Price: number,
        Quantity: number,
        Created_at: Date,
        Updated_at: Date){

            this.ProductID = ProductID;
            this.Created_at = Created_at;
            this.Description = Description;
            this.Discount = Discount;
            this.Price = Price;
            this.ProductName = ProductName;
            this.Quantity = Quantity;
            this.Updated_at = Updated_at;
    }
}
export default ProductModel;