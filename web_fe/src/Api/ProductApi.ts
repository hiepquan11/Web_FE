import { error } from "console";
import ProductModel from "../Models/ProductModel";
import { Request } from "./Request";

async function getProduct(url:string) {
    const Result: ProductModel[] = [];
    const response = await Request(url);

    // get json product
    const responseData = response._embedded.products;
    
    for(const key in responseData){
        Result.push({
            ProductID: responseData[key].productID,
            ProductName: responseData[key].name,
            Description: responseData[key].description,
            Discount: responseData[key].discount,
            Price: responseData[key].price,
            Quantity: responseData[key].quantity,
            Created_at: responseData[key].created_at,
            Updated_at: responseData[key].updated_at,
            Category: responseData[key].listCategory[0].categoryName
        });   
    }
    return Result;
}

export async function GetAllProduct():Promise<ProductModel[]> {
   
    // endpoint
    const url: string  = 'http://localhost:8080/product';

    // call request
    return(getProduct(url));
}

export async function getNewProduct():Promise<ProductModel[]> {
    const url:string  = 'http://localhost:8080/product?sort=productID,desc&page=0&size=3';
    return (getProduct(url))
}

export async function getProductById(productID: number):Promise<ProductModel|null> {
    const url:string = `http://localhost:8080/product/${productID}`;

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Khong goi duoc api product")
        }
        const productData = await response.json();
        if(productData){
            return {
            ProductID: productData.productID,
            ProductName: productData.name,
            Description: productData.description,
            Discount: productData.discount,
            Price: productData.price,
            Quantity: productData.quantity,
            Created_at: productData.created_at,
            Updated_at: productData.updated_at,
            Category: productData.listCategory[0].categoryName
            } 
        } else {
            throw new Error("Product khong ton tai");
        }
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}

export async function findProductByName(productName:string): Promise<ProductModel[]> {

    let url:string = `http://localhost:8080/product?sort=productID,desc&page=0&size=3`
    if(productName !== ''){
        url = `http://localhost:8080/product/search/findByNameContaining?name=${productName}`;
    }

    return (getProduct(url));
}