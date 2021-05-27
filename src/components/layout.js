import React from "react";
import Navbar from "./navbar";
import PropTypes from "prop-types";

const Layout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Navbar />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
