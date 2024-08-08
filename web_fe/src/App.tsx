import React, { useState } from "react";
import "./App.css";
import Navbar from "./layout/header-footer/Navbar";
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/Home/HomePage";


function App() {
  
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <HomePage searchTerm={searchTerm} />
      <Footer/>
   </div>
  );
}

export default App;
