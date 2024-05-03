import React, { useEffect, useState } from 'react';
//https://blog.bitsrc.io/simple-carousel-in-react-2aac73887243


const Carousel = () => {

    const data = ["First Item: 1", "Second Item: 2", "Third Item: 3", "Fourth Item: 4"];
    const [currentIndex, setCurrentIndex] = useState(0);

    const carouselInfiniteScroll = () => {
        if(currentIndex === data.length - 1) {
            //console.log("currentIndex: " + currentIndex);
         return setCurrentIndex(0);
        } 

        //console.log("currentIndex: " + currentIndex);
        return setCurrentIndex(currentIndex + 1);
        

        //console.log("currentIndex: " + currentIndex);
        // var childItem = document.getElementById("childItem");
        // childItem.style.transform = `translate(-${currentIndex * 100}%)`;
    }

    useEffect(() => {
        const interval = setInterval(() => {carouselInfiniteScroll()}, 3000);
        return () => clearInterval(interval)
    });


    return (
        <div>
            <h2>What to learn next</h2>
            {/* position: "relative", */}
            <div style={{  background:'gray', height: '400px', width: '100%', minWidth:'100%'}}>

                {/* <div>
                        <div
                        onClick={(e) => {
                            carouselInfiniteScroll()
                        }}
                        style={{ top: "250px", right: "30px", position: "absolute" }}
                        > 
                            <img className="home_image" src="./src/assets/icons/right_icon.png" />
                        </div>
                        <div
                        onClick={(e) => {
                            carouselInfiniteScroll()
                        }}
                        style={{ top: "250px", left: "30px", position: "absolute" }}
                        >
                            <img className="home_image" src="./src/assets/icons/left_icon.png" />
                        </div>
            
                </div> */}

                <div className = "carousel-container">
                    {/* <div style ={{transform: `translate(-${currentIndex * 100}%)`, transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)', height:'20rem', width:'100%' , minWidth:'100%', display:'flex', alignItems:'center', justifyContent: 'center'}}>
                        <img  style={{ width: "100%", minWidth:'100%', height: "20rem" }} src= "./src/assets/icons/heros/hero_0.jpg"></img>
                    </div>
                    <div style ={{transform: `translate(-${currentIndex * 100}%)`, transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)', height:'20rem', width:'100%' , minWidth:'100%', display:'flex', alignItems:'center', justifyContent: 'center'}}>
                        <img  style={{ width: "100%", minWidth:'100%', height: "20rem" }} src= "./src/assets/icons/heros/hero_1.jpg"></img>
                    </div>
                    <div style ={{transform: `translate(-${currentIndex * 100}%)`, transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)', height:'20rem', width:'100%' , minWidth:'100%', display:'flex', alignItems:'center', justifyContent: 'center'}}>
                        <img  style={{ width: "100%", minWidth:'100%', height: "20rem" }} src= "./src/assets/icons/heros/hero_2.jpg"></img>
                    </div>
                    <div style ={{transform: `translate(-${currentIndex * 100}%)`, transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)', height:'20rem', width:'100%' , minWidth:'100%', display:'flex', alignItems:'center', justifyContent: 'center'}}>
                        <img  style={{ width: "100%", minWidth:'100%', height: "20rem" }} src= "./src/assets/icons/heros/hero_3.jpg"></img>
                    </div> */}
                    {
                        data.map((item, index) => {
                            return (
                            <div style ={{transform: `translate(-${currentIndex * 100}%)`, transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)',  height:"400px", width:'100%' , minWidth:'100%', display:'flex', alignItems:'center', justifyContent: 'center'}} 
                            key = {index} >
                                <img  style={{ width: "100%", minWidth:'100%', height: "400px" }} src= {`./src/assets/icons/heros/hero_${index}.jpg`} ></img>              
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Carousel;