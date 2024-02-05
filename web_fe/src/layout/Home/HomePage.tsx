import React from "react";
import Banner from "./Components/Banner";
import Courasel from "./Components/Courasel";
import ListProduct from "../Product/ListProduct";
function HomePage(){
    return(
        <div>
            {/* <Banner></Banner> */}
            <Courasel></Courasel>
            <ListProduct></ListProduct>
        </div>
    );
}
export default HomePage;