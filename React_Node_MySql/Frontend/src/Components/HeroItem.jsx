import React from "react";

const HeroItem = ({id, index, currentIndex}) => {


   let imageIndex = index > 5 ? 0 : index
   let imageURL = "./src/assets/icons/heros/hero_"+  imageIndex + ".jpg";

  return (
    <div>
        {/* transform: `translate(-${currentIndex * 100}%)`, */}
      <div style={{  width: "100%", minWidth:'100%', height: "400px", minHeight:'400px', display:'grid' }}>
        <div style={{gridArea:'1/1'}}>
          <img
            style={{ width: "100%", height: "400px" }}
            src= {imageURL}
          />
        </div>
        <div style={{ gridArea:'1/1', marginLeft:'120px', marginTop:'150px'}}>
          <div
            style={{
              height: "150px",
              width: "250px",
              background: "white",
              borderRadius: "5px",
              justifyContent:'center',
              textAlign:'center',
              alignItems:'center',
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <h5>Slow and steady:{id} + " Index: " + {index} </h5>
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

export default HeroItem;
