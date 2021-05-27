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
  children: PropTypes.arrayOf(PropTypes.object),
};

export default Layout;
