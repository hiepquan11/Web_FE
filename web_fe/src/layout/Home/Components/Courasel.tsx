import React from "react";
import './Courasel.css'
function Courasel(){
    return(
      <div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide mt-3">
          <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                  <div className="row align-items-center">
                      <div className="col-5 text-center">
                          <img src={require('./../../../images/Screenshot.png')} className="float-end"/>
                      </div>
                      <div className="col-7">
                          <h5>First slide label</h5>
                          <p>Some representative placeholder content for the first slide.</p>
                      </div>
                  </div>
              </div>
              <div className="carousel-item " data-bs-interval="10000">
                  <div className="row align-items-center">
                      <div className="col-5 text-center">
                          <img src={require('./../../../images/Screenshot.png')} className="float-end" />
                      </div>
                      <div className="col-7">
                          <h5>First slide label</h5>
                          <p>Some representative placeholder content for the first slide.</p>
                      </div>
                  </div>
              </div>
              <div className="carousel-item " data-bs-interval="10000">
                  <div className="row align-items-center">
                      <div className="col-5 text-center">
                          <img src={require('./../../../images/Screenshot.png')} className="float-end"/>
                      </div>
                      <div className="col-7">
                          <h5>First slide label</h5>
                          <p>Some representative placeholder content for the first slide.</p>
                      </div>
                  </div>
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
      </div>
  </div>
    );
}
export default Courasel;