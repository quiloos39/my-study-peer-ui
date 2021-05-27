import React from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import imageStudents from "../images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";

const Menu = ({ gradient, children, ...props }) => {
  return (
    <div
      className="text-white p-4 mb-4"
      style={{ background: gradient }}
      {...props}
    >
      {children}
    </div>
  );
};

Menu.propTypes = {
  gradient: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
};

const Announcement = ({ title, desc, ...props }) => {
  return (
    <div {...props}>
      <div
        style={{
          maxHeight: "500px",
          width: "100%",
          height: "150px",
          backgroundColor: "#1f2f71",
        }}
      ></div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};

Announcement.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

const IndexPage = () => {
  let announcements = [
    {
      id: 1,
      title: "Brand new ui",
      desc: "Test",
    },
  ];

  return (
    <Layout>
      <div className="container bg-white my-4 h-100">
        <div className="row">
          <div className="col-lg-9">
            <Menu gradient="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
              <div className="mb-3">
                <h2 className="fw-bold">Looking for a study partner ?</h2>
                <p>Maybe just someone to help you with your course ?</p>
              </div>
              <Link className="btn btn-success" to="/register">
                Register today
              </Link>
            </Menu>
            <Menu gradient="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
              <div className="mb-3">
                <h2 className="fw-bold">Already have account ?</h2>
                <p>What are you waiting for login already</p>
              </div>
              <Link className="btn btn-success" to="/login">
                Login
              </Link>
            </Menu>
          </div>
          <div
            className="col-lg-3 order-first order-lg-last mb-4"
            style={{ height: "600px" }}
          >
            <img
              src={imageStudents}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <h2>News</h2>
          <hr />
          <div className="row">
            {announcements.map((announcement) => (
              <Announcement
                key={announcement.id}
                title={announcement.title}
                desc={announcement.desc}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
