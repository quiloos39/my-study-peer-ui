import React from "react";
import imageStudents from "../images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg";
import Layout from "../components/layout";
import PropTypes from "prop-types";

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

const IndexPage = () => {
  return (
    <Layout className="vh-100 d-flex flex-column">
      <div className="container bg-white p-4 flex-grow-1 my-2 h-100">
        <div className="row h-100">
          <div className="col-lg-9">
            <Menu gradient="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
              <div className="mb-3">
                <h2 className="fw-bold">Looking for a study partner ?</h2>
                <p>Maybe just someone to help you with your course ?</p>
              </div>
              <button className="btn btn-success">Register today</button>
            </Menu>
            <Menu gradient="linear-gradient(90deg, rgba(32,80,154,1) 0%, rgba(55,112,172,1) 100%)">
              <div className="mb-3">
                <h2 className="fw-bold">Already have account ?</h2>
                <p>What are you waiting for login already</p>
              </div>
              <button className="btn btn-success">Login</button>
            </Menu>
            <div>
              <h2>News</h2>
              <hr />
              <div className="row">
                <div className="col-lg-3">
                  <div
                    style={{
                      maxHeight: "500px",
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#1f2f71",
                    }}
                  ></div>
                  <h4>Brand new ui</h4>
                  <p>asdasdasd</p>
                </div>
                <div className="col-lg-3">
                  <div
                    style={{
                      maxHeight: "500px",
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#182a79",
                    }}
                  ></div>
                  <h4>Biggest update ever</h4>
                  <p>asdasdasd</p>
                </div>
                <div className="col-lg-3">
                  <div
                    style={{
                      maxHeight: "500px",
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#112984",
                    }}
                  ></div>
                  <h4>Hello normies</h4>
                  <p>asdasdasd</p>
                </div>
                <div className="col-lg-3">
                  <div
                    style={{
                      maxHeight: "500px",
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#062180",
                    }}
                  ></div>
                  <h4>I love yeliz hoca</h4>
                  <p>asdasdasd</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="homepage-header"
            className="col-lg-3 order-first order-lg-last mb-4"
          >
            <img
              src={imageStudents}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
