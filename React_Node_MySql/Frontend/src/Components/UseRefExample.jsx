import {useRef} from "react";

const UseRefExample = () => {

    let myHeadLine = useRef();

    const changeHeader = () => {
        myHeadLine.innerText = "This is final Header";
    } 

    let myImage = useRef();
    const changeImage = () => {
        myImage.current.src = "https://placehold.co/600x400?text=Hello+World";
        myImage.current.setAttribute('height','200px')
        myImage.current.setAttribute('width','200px')
    }

    let fName,lName = useRef();

    const myName = () => {
        let lastName = lName.value;
        let firstName = fName.value;
         
        alert(firstName + " " + lastName);
    }

    let titleWithCss = useRef();
    const changeColor = () =>{
        titleWithCss.current.classList.remove('text-success');
        titleWithCss.current.classList.add('text-danger');
    }

    let myNumber = useRef(0);
    const changeNumber = () => {
        myNumber.current++;
        alert("Number is:" + myNumber.current);
    }

    let APIData = useRef(null);
    let myData = useRef();

    const fetchData = async () => {
       const response = await fetch("https://dummyjson.com/product/1");
       APIData.current = await response.json();
    }

    const showData = () => {
        myData.current.innerText = JSON.stringify(APIData.current);
    }

    return (
        <div style={{backgroundColor:'Lavender'}}>
            <hr/>
            <h1 >UseRef example Page</h1>
            
            <h3 ref={(hh) => myHeadLine = hh}>This is header want to change .</h3>
            <button onClick={changeHeader}>Change Text</button>
            <br/>
            
            <img ref={myImage} src="https://placehold.co/300x300"/> <br/>
            <button onClick = {changeImage} >Change Image</button>
            <br/>
            <br/>
            <input ref = {(a) =>fName = a} placeholder="First Name"/> <br/><br/>
            <input ref = {(a) =>lName = a} placeholder="Last Name"/> <br/><br/>
            <button onClick={myName}>Full Name</button><br/><br/>
            
            <h4 ref={titleWithCss} className="text-success">This is css change by useRef</h4>
            <button onClick={changeColor}>Change css color</button><br/><br/>

            <button onClick={changeNumber}>Change Number</button><br/><br/>

            <p ref={myData}></p><br/>
            <button onClick={fetchData}>Call API</button><br/>
            <button onClick={showData}>Show Data</button><br/>
            <hr/>
        </div>
    );
};

export default UseRefExample;