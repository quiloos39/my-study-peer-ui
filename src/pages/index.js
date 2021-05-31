import React, { useEffect } from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import axios from "axios";

import imageStudents from "../images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";
import Navbar from "../components/navbar";
import "../mock/announcements";

const Menu = ({ background, children, ...props }) => {
  return (
    <div
      className="text-white p-4 mb-4"
      style={{ background: background }}
      {...props}
    >
      {children}
    </div>
  );
};

Menu.propTypes = {
  background: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
};

const Announcement = ({ announcement, ...props }) => {
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
      <h4>{announcement.title}</h4>
      <p>{announcement.desc}</p>
    </div>
  );
};

Announcement.propTypes = {
  announcement: PropTypes.object,
};

const Announcements = () => {
  let [announcements, setAnnouncements] = React.useState([]);

  useEffect(() => {
    async function fetchAnnouncements() {
      axios
        .get("/api/announcements")
        .then((res) => {
          setAnnouncements(res.data);
          console.log(announcements);
        })
        .catch((error) => {
          setAnnouncements([]);
          console.log(error);
        });
    }
    fetchAnnouncements();
  }, [announcements.length]);

  return (
    <div>
      <h2>Announcement</h2>
      <hr />
      <div className="row">
        {announcements.map((announcement) => (
          <Announcement
            className="col-lg-3 mb-3"
            key={announcement.id}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-10">
            <Menu background="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
              <div className="mb-3">
                <h2 className="fw-bold">Looking for a study partner ?</h2>
                <p>Maybe just someone to help you with your course ?</p>
              </div>
              <Link className="btn btn-success" to="/register">
                Register today
              </Link>
            </Menu>
            <Menu background="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
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
            className="col-lg-2 order-first order-lg-last mb-4"
            style={{ height: "500px" }}
          >
            <img
              src={imageStudents}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <Announcements />
      </div>
    </Layout>
  );
};

export default IndexPage;
