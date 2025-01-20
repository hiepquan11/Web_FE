import React, { useState } from "react";
import "./App.css";
import HomePage from "./layout/Home/HomePage";
import NavBar from "./layout/header-footer/NavBar";
import Footer from "./layout/header-footer/Footers";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
import About from "./layout/about/About";
import ProductDetail from "./layout/Product/ProductDeatail";
import SignUp from "./layout/User/SignUp";
import SignIn from "./layout/User/SignIn";
import ActivationPage from "./layout/User/ActiovationPage";
import Dashboard from "./layout/admin/Dashboard";
import ProductPage from "./layout/admin/Components/main/ProductManagement";
import UserPage from "./layout/admin/Components/main/UserPage";
import AddProduct from "./layout/admin/Components/main/Components/AddProduct";
import UpdateProductPage from "./layout/admin/Components/main/Components/UpdateProduct";
import Cart from "./layout/Home/Components/Cart";
import useCheckExpirationTime from "./layout/Home/Components/useCheckExirationTime";


const MyRoute = () =>{
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  useCheckExpirationTime();
  return(
    <>
      
      {!isAdmin && (
        <>
          <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:productID" element={<ProductDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activate/:email/:activationCode" element={<ActivationPage />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
          <Footer />
        </>
      )}
      {isAdmin && (
        <>
          <Dashboard />
          <Routes>
            <Route path="/admin/productPage" element={<ProductPage/>} />
            <Route path="/admin/userPage" element={<UserPage/>}/>
            <Route path="/admin/addProduct" element={<AddProduct/>}/>
            <Route path="/admin/updateProduct/:productID" element={<UpdateProductPage/>}></Route>
          </Routes>
        </>
      )}
    </>
  )
}


function App() {
  
  

  return (
   <div className="App">
      <BrowserRouter>
        <MyRoute/>
      </BrowserRouter>
   </div>
  );
}

export default App;
