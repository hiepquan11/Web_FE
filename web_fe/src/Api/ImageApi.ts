import ImageModel from "../Models/ImageModel";
import { Request } from "./Request";

async function getImage(url:string):Promise<ImageModel[]> {
    const result : ImageModel[] = [];
    const response = await Request(url);
    const responseData = response._embedded.images;

    for(const key in responseData){
        result.push({
            ImageID: responseData[key].imageID,
            ImageName: responseData[key].imageName,
            Path: responseData[key].path,
            ImageData: responseData[key].imageData
    });
    }
    return result;

}
export async function getAllImage(ProductID:number):Promise<ImageModel[]> {
   
    // endpoint
    const url:string = `http://localhost:8080/product/${ProductID}/ListImage`;

    // call request
    
    //console.log(response);

    // get image json
    return getImage(url);
    
}

export async function getImageOfOneBook(ProductID:number):Promise<ImageModel[]> {
    const url = `http://localhost:8080/product/${ProductID}/ListImage?sort=imageID,asc&page=0&size=1`;
    return getImage(url);
}