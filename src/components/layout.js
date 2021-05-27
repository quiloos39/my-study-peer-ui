import React from "react";
import Navbar from "./navbar";

const Layout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
