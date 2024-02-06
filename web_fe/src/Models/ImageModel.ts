class ImageModel {
    ImageID: string;
    ImageName?: string;
    Path?: string;
    ImageData?: string;

    constructor( 
        ImageID: string,
        ImageName: string,
        Path: string,
        ImageData: string){
            this.ImageData = ImageData;
            this.ImageID = ImageID;
            this.Path = Path;
            this.ImageName = ImageName;
    }
}
export default ImageModel;