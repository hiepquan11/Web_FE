import ImageModel from "../Models/ImageModel";
import { Request } from "./Request";

async function getImage(url:string):Promise<ImageModel[]> {
    const result : ImageModel[] = [];
    const response = await Request(url);
    const responseData = response._embedded.images;

    for(const key in responseData){
        result.push({
            ImageID: responseData[key].imageID,
            ImageName: responseData[key].name,
            ImageData: responseData[key].imageData,
            ImageUrl: responseData[key].imageURL
    });
    }
    return result;

}
export async function getAllImage(ProductID:number):Promise<ImageModel[]> {
   
    // endpoint
    const url:string = `http://localhost:8080/product/${ProductID}/listImage`;

    // call request
    
    //console.log(response);

    // get image json
    return getImage(url);
    
}

export async function getImageOfOneProduct(ProductID:number):Promise<ImageModel[]> {
    const url = `http://localhost:8080/product/${ProductID}/listImage?sort=imageID,asc&page=0&size=1`;
    return getImage(url);
}

export async function getNewImage():Promise<ImageModel[]> {
    const url: string = 'http://localhost:8080/image?sort=imageID,desc&page=0&size=3'
    return getImage(url)
    
}