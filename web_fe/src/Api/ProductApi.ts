import { error } from "console";
import ProductModel from "../Models/ProductModel";
import { Request } from "./Request";

async function getProduct(url:string) {
    const Result : ProductModel[] = []
    const response = await Request(url);
    const responseData = response;

    for(const key in responseData){
        Result.push({
            ProductID: responseData[key].productId,
            ProductName: responseData[key].productName,
            Description: responseData[key].productDescription,
            Price: responseData[key].productPrice,
            Quantity: responseData[key].productPrice,
            ImageUrls: responseData[key].productImageUrls,
            CategoryNames: responseData[key].categoryNames
        });
    }
    return Result;
}

async function getOneProduct(url: string) {

    const response = await Request(url);
    const responseData = response;

    const product : ProductModel = {
        ProductID: responseData.productId,
        ProductName: responseData.productName,
        Description: responseData.productDescription,
        Price: responseData.productPrice,
        Quantity: responseData.productQuantity,
        ImageUrls: responseData.productImageUrls,
        CategoryNames: responseData.categoryNames
    }

    return product;
}

export async function GetAllProduct():Promise<ProductModel[]> {
   
    // endpoint
    const url: string  = 'http://localhost:8080/api/product';

    // call request
    return (getProduct(url));
}

export async function getNewProduct():Promise<ProductModel[]> {
    const url:string  = 'http://localhost:8080/product?sort=productID,desc&page=0&size=3';
    return (getProduct(url))
}

export async function getProductById(productID: number):Promise<ProductModel|null> {
    const url:string = `http://localhost:8080/api/product/${productID}`;

    return getOneProduct(url)
}

export async function findProductByName(productName:string): Promise<ProductModel[]> {

    let url:string = `http://localhost:8080/product?sort=productID,desc&page=0&size=3`
    if(productName !== ''){
        url = `http://localhost:8080/product/search/findByNameContaining?name=${productName}`;
    }

    return (getProduct(url));
}