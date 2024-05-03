import React from "react";
import { useParams } from "react-router-dom";
import CreateEmployee from "../Components/CreateEmployee";
import Signup from "../Components/Signup/Signup";

const ProductPage = () => {
  let { id, name } = useParams();

  return (
    <>
      {/* <div style={{ marginTop: "60px", background: "aliceblue" }}> */}
      <div>
        <h1>This is Product Page</h1>
        <p>ID:{id}</p>
        <p>Name:{name}</p>

        <CreateEmployee />
        <Signup />
      </div>
    </>
  );
};

export default ProductPage;
