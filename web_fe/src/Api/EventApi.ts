import EventModel from "../Models/EventModel";
import { Request } from "./Request";

async function getEvent(url: string):Promise<EventModel[]> {
    const result:EventModel[] = [];
    const response = await Request(url);
    const responseData = response._embedded.events;
    for(const key in responseData){
        result.push({
            EventID: responseData[key].eventID,
            EventName: responseData[key].eventName,
            EventImage: responseData[key].eventImage
        });
    }
    return result;
}

export async function getNewEvent():Promise<EventModel[]> {
    const url:string = 'http://localhost:8080/event?sort=imageID,desc&page=0&size=3'
    return getEvent(url);
    
}