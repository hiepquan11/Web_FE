import React from "react";
import "./App.css";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/Home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layout/about/About";
import ProductDetail from "./layout/Product/Components/ProductDetail";


function App() {
  
  return (
   <div className="App">
    <BrowserRouter> 
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/product/:productId" element={<ProductDetail/>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
   </div>
  );
}

export default App;
