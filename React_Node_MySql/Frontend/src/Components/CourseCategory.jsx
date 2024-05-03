import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { allCategories } from "../Utils/APIManager.js";
import "react-horizontal-scrolling-menu/dist/styles.css";

//https://www.npmjs.com/package/react-horizontal-scrolling-menu

const CourseCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    allCategories(receivedAllCourses);
  }, []);

  function handleClick(name) {
    alert("Name: " + name);
  }

  function receivedAllCourses(data) {
    setCategories(data);
    console.log("CourseCategory >> receivedAllCourses >> " + categories.length);
  }

  return (
    <div>
      <div>
        <h3>Explore Course Category</h3>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >
          {categories.map((category, index) => (
            <Card title = {category.name} mail={""} itemId = {index} key = {index} />
          ))}
        </ScrollMenu>
      </div>
    </div>
  );

  function Arrow({ children, disabled, onClick }) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          opacity: disabled ? "0" : "1",
          userSelect: "none",
          border: "none",
          backgroundColor: "transparent"
        }}
      >
        {children}
      </button>
    );
  }

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <img className="home_image" src="./src/assets/icons/left_icon.png" />
      </Arrow>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <img className="home_image" src="./src/assets/icons/right_icon.png" />
      </Arrow>
    );
  }

  function Card({ title, mail, itemId }) {
    let index = itemId > 5 ? 0 : itemId
   let imageURL = "./src/assets/icons/courses/course_"+  index + ".png";

    return (
      <div
        role="button"
        style={{
          // border: "1px solid",
          display: "inline-block",
          margin: "0 10px",
          width: "300px",
          height: "200px",
          userSelect: "none",
          marginLeft: '5px',
          marginRight: '5px',
          backgroundColor: "aliceblue"
        }}
        tabIndex={0}
        // className="card"
        onClick={(e) => {
          handleClick(title);
        }}
      >
        <div > <img style = {{width: '300px'}} src={imageURL} /> </div>
        <div>
          <div>{title}</div>
          <div>{mail}</div>
        </div>
      </div>
    );
  }
};

export default CourseCategory;