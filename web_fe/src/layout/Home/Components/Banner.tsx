import React from "react";
function Banner() {
  return (
    <div className="p-5 mb-5 bg-dark">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
            <h2 className="display-5 fw-bold">
                DCMMM
            </h2>
            <button className="btn btn-primary btn-lg text-white float-end">Khám phá ngay</button>
        </div>
      </div>
    </div>
  );
}
export default Banner;
