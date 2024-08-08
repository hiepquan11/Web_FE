import React from "react";
import Banner from "./Components/Banner";
import Courasel from "./Components/Courasel";
import ListProduct from "../Product/ListProduct";

interface HomePageProps{
    searchTerm: string,
}

function HomePage({searchTerm}: HomePageProps){
    return(
        <div>
            <Banner></Banner>
            {/* <Courasel></Courasel> */}
            <ListProduct searchTerm={searchTerm}></ListProduct>
        </div>
    );
}
export default HomePage;