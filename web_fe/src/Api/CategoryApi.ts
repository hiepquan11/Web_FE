import { error } from 'console';
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

export async function getAllCategories():Promise<CategoryModel[]> {
    const url: string = 'http://localhost:8080/category';
    return getCategory(url);
}

export async function getCategoryByProductID(productID:number):Promise<CategoryModel | null> {
    const url: string = `http://localhost:8080/product/${productID}/ListCategory`;
    return getOneCategory(url);
}

export async function getCategoryOfOneProduct(productID:number):Promise<CategoryModel[]> {
    const url = `http://localhost:8080/product/${productID}/ListImage?sort=imageID,asc&page=0&size=1`;
    return getCategory(url);
}

export async function getCategoryById(categoryId: number):Promise<CategoryModel | null> {
    const url: string = `http://localhost:8080/category/${categoryId}`;
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Failed to call api category")
        }
        const responseData = await response.json();
        if(responseData){
            return {
                categoryId: responseData.categoryID,
                categoryName: responseData.categoryName
            }
        } else {
            throw new Error("Category not found")
        }
    } catch (error) {
        console.log(error)
        return null
    }
}