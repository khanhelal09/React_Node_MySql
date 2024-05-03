import React from "react";
import EmployeesList from "../Components/EmployeesList";
import Recommanded from "../Components/Recommanded";
import MyLearning from "../Components/MyLearning";
import HeroBanner from "../Components/HeroBanner";
import HeroBannerList from "../Components/HeroBannerList";
import Carousel from "../Components/Carousel";
import CarouselBootstrap from "../Components/CarouselBootstrap";
import CourseCategory from "../Components/CourseCategory";

const HomePage = () => {
  return (
    <>
      <div>
        {/* <HeroBanner /> <br/> */}
        <CarouselBootstrap /> <br/>
        <Carousel /> <br/>
        {/* <HeroBannerList /> */}
        {/* <EmployeesList /> */}
        <br/>
        <MyLearning />
        <CourseCategory />
        <Recommanded />
        
        
      </div>
    </>
  );
};

export default HomePage;
