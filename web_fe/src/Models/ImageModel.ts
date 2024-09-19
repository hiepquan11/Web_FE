class ImageModel {
    ImageID: string;
    ImageName?: string;
    Path?: string;
    ImageData?: string;
    ImageUrl?: string

    constructor( 
        ImageID: string,
        ImageName: string,
        Path: string,
        ImageData: string,
        ImageUrl: string){
            this.ImageData = ImageData;
            this.ImageID = ImageID;
            this.Path = Path;
            this.ImageName = ImageName;
            this.ImageUrl = ImageUrl;
    }
}
export default ImageModel;