import React from "react";
import { useParams } from "react-router-dom";
import UpdateEmployee from "../Components/UpdateEmployee";

const ProfilePage = () => {
  let { ID } = useParams();

  return (
    <div>
      {/* <div style={{ marginTop: "60px", background: "aliceblue" }}> */}
      <div>
        <h3>This is Profile Page</h3>
        <h6>ID:{ID}</h6>

        <UpdateEmployee id={ID} />
        <br />
      </div>
    </div>
  );
};

export default ProfilePage;
