import CategoryModel from "../Models/CategoryModel";
import { Request } from "./Request";

async function getCategory(url: string) {
    const result: CategoryModel[] = [];
    const response = await Request(url);

    const responseData = response._embedded.categories;

    for(const key in responseData){
        result.push({
            categoryId: responseData[key].categoryID,
            categoryName: responseData[key].categoryName
        })
    }
    return result;
}

async function getOneCategory(url: string) {
    let result: CategoryModel | null = null; 
    const response = await Request(url);

    const responseData = response._embedded.categories;

    if (responseData && responseData.length > 0) {
        result = {
            categoryId: responseData[0].categoryID,
            categoryName: responseData[0].categoryName
        };
    }

    return result;
}

export async function getCategoryByProductID(productID:number):Promise<CategoryModel | null> {
    const url: string = `http://localhost:8080/product/${productID}/ListCategory`;
    return getOneCategory(url);
}

export async function getCategoryOfOneProduct(productID:number):Promise<CategoryModel[]> {
    const url = `http://localhost:8080/product/${productID}/ListImage?sort=imageID,asc&page=0&size=1`;
    return getCategory(url);
}