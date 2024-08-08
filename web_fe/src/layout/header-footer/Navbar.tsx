import React, { ChangeEvent, useState } from "react";
import './Navbar.css'

interface NavbarProps{
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

function Navbar({searchTerm, setSearchTerm}: NavbarProps){

  const [tempKeyWord, setTempKeyWord] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setTempKeyWord(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setSearchTerm(tempKeyWord);  
  }
  
    return (
      <div className="Nav">
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Trang chủ</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Thể loại sách
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><a className="dropdown-item" href="#">Thể loại 1</a></li>
                  <li><a className="dropdown-item" href="#">Thể loại 2</a></li>
                  <li><a className="dropdown-item" href="#">Thể loại 3</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Quy định bán hàng
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                  <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                  <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Liên hệ</a>
              </li>
            </ul>
          </div>
  
          <form className="d-flex pr-3.5" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Bạn cần gì..." aria-label="Search" value={tempKeyWord} onChange={handleInputChange} />
          </form>

  
          {/*Cart icon */}
          <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-shopping-cart"></i>
                Giỏ hàng
              </a>
            </li>
          </ul>
  
          {/* Login icon */}
          <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-user"></i>
                <a href="#" className=""> Đăng Nhập</a> |  <a href="#" className="">Đăng Ký</a>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    );
}
export default Navbar;