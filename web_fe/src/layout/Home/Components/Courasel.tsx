import React, { useEffect, useState } from "react";
import './Courasel.css'
import { Carousel } from "flowbite-react";
import { getNewEvent } from "../../../Api/EventApi";
import EventModel from "../../../Models/EventModel";


const Courasel:React.FC = () => {
        const[loadData, setLoadData] = useState(true);
        const[error, setError] = useState(true);
        const[listEvent, setListEvent] = useState<EventModel[]>([]);


       

        useEffect(() =>{
            getNewEvent().then(
                eventData =>{
                    setListEvent(eventData);
                    setLoadData(false);
                    setError(false);
                }
            ).catch(
                error =>{
                    setLoadData(false);
                    setError(error.message)
                }
            )
        },[])

        if(loadData){
            return (
                <div><h1>Load data....</h1></div>
            );
        }
        if(error){
            return(
                <div><h1>Error: {error}</h1></div>
            );
        }

        return (
            <div className=" grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img src={listEvent[0].EventImage} alt="..." />
                    <img src={listEvent[1].EventImage} alt="..." />
                    <img src={listEvent[2].EventImage} alt="..." />
                </Carousel>
                <Carousel indicators={false}>
                    <img src={listEvent[0].EventImage} alt="..." />
                    <img src={listEvent[1].EventImage} alt="..." />
                    <img src={listEvent[2].EventImage} alt="..." />
                </Carousel>
                
            </div>
            
          );
}
export default Courasel;