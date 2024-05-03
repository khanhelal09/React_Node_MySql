import React from "react";

const HeroBanner = () => {
  

  function rightClick() {
    alert("This is right arrow");
  }

  function handleClick(name) {
    alert("this is click of " + name + " arrow");
  }

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div
          onClick={(e) => {
            handleClick("right");
          }}
          style={{ top: "150px", right: "30px", position: "absolute" }}
        >
          <img className="home_image" src="./src/assets/icons/right_icon.png" />
        </div>
        <div
          onClick={(e) => {
            handleClick("left");
          }}
          style={{ top: "150px", left: "30px", position: "absolute" }}
        >
          <img className="home_image" src="./src/assets/icons/left_icon.png" />
        </div>

        <div>
          <img
            style={{ width: "100%", height: "400px" }}
            src="./src/assets/icons/heros/hero_2.jpg"
          />
        </div>

        <div style={{ top: "150px", left: "120px", position: "absolute" }}>
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
            <h3>Slow and steady</h3>
            <p>
              Try learning just 5–10 minutes a day.{" "}
              <a href="https://www.shecodes.io/">Continue your course</a> and
              reach your peak potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
