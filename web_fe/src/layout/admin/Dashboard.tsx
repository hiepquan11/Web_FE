import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./Components/main/ProductManagement";
import Sidebar from "./Components/Sidebar";
import RequireAdmin from "./Components/main/Components/RequireAdmin";

const Dashboard = () =>{
    return(
        <div className="text-gray-800 font-inter">
            <Sidebar/>
        </div>
    )
}
const DashboardPage = RequireAdmin(Dashboard);
export default DashboardPage;