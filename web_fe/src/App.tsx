import React, { useState } from "react";
import "./App.css";
import Footer from "./layout/header-footer/footer";
import HomePage from "./layout/Home/HomePage";
import NavBar from "./layout/header-footer/NavBar";



function App() {
  
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <div className="App">
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <HomePage searchTerm={searchTerm} />
      <Footer/>
   </div>
  );
}

export default App;
