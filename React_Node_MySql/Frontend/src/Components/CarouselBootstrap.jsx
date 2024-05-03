import React, { useEffect, useState } from "react";
import { allEmployees } from "../Utils/APIManager.js";
//https://getbootstrap.com/docs/5.3/components/carousel/


const CarouselBootstrap = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    allEmployees(receivedAllEmployees);
  }, []);

  function receivedAllEmployees(data) {
    setEmployees(data);
    console.log("CarouselBootstrap >> receivedAllEmployees >> " + employees.length);
  }


  return (
    <div>
      <div id="carouselExample" class="carousel slide" >
        <div class="carousel-inner" style={{height:'500px', minHeight:'500px'}}>

        {employees.map((listItem, index) => {

            let imageIndex = index > 5 ? 0 : index;

            return (
                <div class = {index == 0? "carousel-item active" : "carousel-item"}  key={index}>
                    <div style={{position: "relative"}}>
                        <img src = {`./src/assets/icons/heros/hero_${imageIndex}.jpg`} class = "d-block w-100" alt="..." />
                        
                        {/* overlay start */}
                        <div style={{ top: "250px", left: "120px", position: "absolute" }}>
                            <div
                                style={{
                                height: "150px",
                                width: "250px",
                                background: "white",
                                borderRadius: "5px",
                                textAlign: "center",
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                }}
                            >
                                <h3>Slow and steady Name:{listItem.name} </h3>
                                <p>
                                Try learning just 5–10 minutes a day.{" "}
                                <a href="https://www.shecodes.io/">Continue your course</a> and
                                reach your peak potential.
                                </p>
                            </div>
                        </div>
                        {/* overlay End */}
                    </div>
                </div>
            );
          })}

          {/* <div class="carousel-item active">
            <img
              src="./src/assets/icons/heros/hero_0.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="./src/assets/icons/heros/hero_1.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="./src/assets/icons/heros/hero_2.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div> */}
        </div>
        <div
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          style={{marginTop:'200px', height:'55px', width:'55px', marginLeft:'15px', background:'gray'}}
        >
          {/* <span class="carousel-control-prev-icon" aria-hidden="true"></span> */}
          {/* <span class="visually-hidden">Previous</span> */}
          <img className="home_image" src="./src/assets/icons/left_icon.png" />
        </div>
        <div
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          style={{marginTop:'200px', height:'55px', width:'55px', marginRight:'15px', background:'gray'}}
        >
          {/* <span class="carousel-control-next-icon" aria-hidden="true"></span> */}
          {/* <span class="visually-hidden">Next</span> */}
          <img className="home_image" src="./src/assets/icons/right_icon.png" />
        </div>
      </div>
    </div>
  );
};

export default CarouselBootstrap;
