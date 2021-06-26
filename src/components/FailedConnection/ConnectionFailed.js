import React from "react";
import Navbar from "../Navbar/Navbar";
import Layout from "../Layout/Layout";
import errorImage from "../../images/gxrb_bn-iwbd1o7gyrsxyojbeilmz45j7zmzcaxf77y.jpg";
const ConnectionFailed = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <img
        src={errorImage}
        style={{ width: "100%", height: "500px", objectFit: "contain" }}
      />
      <h1>Unable to connect to server.</h1>
    </div>
  );
};

export default ConnectionFailed;
