import React, { useState } from "react";
import "./App.css";
import HomePage from "./layout/Home/HomePage";
import NavBar from "./layout/header-footer/NavBar";
import Footer from "./layout/header-footer/Footers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layout/about/About";
import ProductDetail from "./layout/Product/ProductDeatail";
import SignUp from "./layout/User/SignUp";
import SignIn from "./layout/User/SignIn";
import ActivationPage from "./layout/User/ActiovationPage";



function App() {
  
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <div className="App">
      <BrowserRouter>
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>
        <Routes>
          <Route path="/" element = {<HomePage searchTerm={searchTerm}/>}></Route>
          <Route path="/about" element = {<About/>}/>
          <Route path="/product/:productID" element={<ProductDetail/>}></Route>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/activate/:email/:activationCode" element={<ActivationPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
   </div>
  );
}

export default App;
