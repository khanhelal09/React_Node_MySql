import React, { useEffect, useRef, useState } from "react";
import { allEmployees } from "../Utils/APIManager.js";
import HeroItem from "./HeroItem.jsx";

const HeroBannerList = () => {

  let right = "right";
  let left = "left";
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    allEmployees(receivedAllEmployees);
  }, []);

  function receivedAllEmployees(data) {
    console.log("HeroBannerList >> receivedAllEmployees >> ");
    setEmployees(data);
  }

  function handleClick(name) {
    if (name === left) {
      //container.scrollIntoView(alignToLeft);
      itemEls.current?.scrollIntoView(true);
      itemEls.current?.scrollIntoView({block: "end"});
      itemEls.current?.scrollIntoView({behavior: "smooth", block: 'nearest'});
      //container.scrollLeft += 1300;
    } else {
      //container.scrollIntoView(alignItems);
      itemEls.current?.scrollIntoView(true);
      itemEls.current?.scrollIntoView({block: "end"});
      itemEls.current?.scrollIntoView({behavior: "smooth", block: 'nearest'});
      //container.scrollLeft -= 1300;
    }
  }

  const itemEls = useRef(new Array())
  const [currentIndex, setCurrentIndex] = useState(0);
  
    const carouselInfiniteScroll = () => {
        if(currentIndex === employees.length - 1) {
             setCurrentIndex(0);
             console.log("currentIndex: " + currentIndex);
             itemEls.current.style.transform = `translate(-${currentIndex * 100}%)`;
        } else {
           setCurrentIndex(currentIndex + 1);
           console.log("currentIndex: " + currentIndex);
           itemEls.current.style.transform = `translate(-${currentIndex * 100}%)`;
        }
    }

  return (
    <div>
      <div style={{ position: "relative", width:'100%', height:'400px' }}>
        <div
          onClick={(e) => {
            // handleClick(right);
            //carouselInfiniteScroll();
          }}
          style={{ top: "150px", right: "30px", position: "absolute" }}
        >
          <img className="home_image" src="./src/assets/icons/right_icon.png" />
        </div>
        <div
          onClick={(e) => {
            // handleClick(left);
            //carouselInfiniteScroll();
          }}
          style={{ top: "150px", left: "30px", position: "absolute" }}
        >
          <img className="home_image" src="./src/assets/icons/left_icon.png" />
        </div>
       
       
        {/* overflowX:'hidden', alignItems:'center', width:'100%', height:'400px' */}
        <div style={{ overflowX:'hidden', display:'flex', whiteSpace:'nowrap'}}>
          {employees.map((listItem, index) => {
            return (
              // transform: `translate(-${currentIndex * 100}%)`,
              <div key = {index} ref = {(element) => itemEls.current[index] = element} style={{transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)',  width: "100%", minWidth:'100%', height: "400px", display:'inline-block' }}>
                <HeroItem id = {listItem.id} index ={index} currentIndex = {currentIndex} />
              </div>
          );
          })}

        </div>
      </div>
    </div>
  );
};

export default HeroBannerList;
