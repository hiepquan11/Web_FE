import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./Components/main/ProductPage";
import Sidebar from "./Components/Sidebar";

function Dashboard(){
    return(
        <div className="text-gray-800 font-inter">
            <Sidebar/>
        </div>
    )
}
export default Dashboard;