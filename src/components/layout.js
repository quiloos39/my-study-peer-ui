import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
