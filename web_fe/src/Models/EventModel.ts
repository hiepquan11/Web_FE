class EventModel{
    EventID: String;
    EventName?: String;
    EventImage?: string;

    constructor(EventID: String,
        EventName: String,
        EventImage: string){

            this.EventID = EventID;
            this.EventImage = EventImage;
            this.EventName = EventName;
        }
}
export default EventModel;