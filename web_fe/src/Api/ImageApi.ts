import ImageModel from "../Models/ImageModel";
import { Request } from "./Request";

export async function getAllImage(ProductID:number):Promise<ImageModel[]> {
    const result : ImageModel[] = [];

    // endpoint
    const url:string = `http://localhost:8080/product/${ProductID}/ListImage`;

    // call request
    const response = await Request(url);
    //console.log(response);

    // get image json
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