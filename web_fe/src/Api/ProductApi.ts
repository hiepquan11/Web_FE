import ProductModel from "../Models/ProductModel";
import { Request } from "./Request";



export async function GetAllProduct():Promise<ProductModel[]> {
    const Result: ProductModel[] = [];
    // endpoint
    const url: string  = 'http://localhost:8080/product';

    // call request
    const response = await Request(url);

    // get json product
    const responseData = response._embedded.products;
    
    console.log(response);
    for(const key in responseData){
        Result.push({
            ProductID: responseData[key].productID,
            ProductName: responseData[key].name,
            Description: responseData[key].description,
            Discount: responseData[key].discount,
            Price: responseData[key].price,
            Quantity: responseData[key].quantity,
            Created_at: responseData[key].created_at,
            Updated_at: responseData[key].updated_at
        });
       
    }
    
    return Result;
}