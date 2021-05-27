import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

import headerImage from "../images/alex-kulikov-BrunIOLQMfQ-unsplash.jpg";
import avatar1 from "../images/10371011.png";
import avatar2 from "../images/75804467.png";

const AboutPage = () => {
  return (
    <Layout>
      <img
        src={headerImage}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div className="container my-5">
        <div className="mb-5">
          <h2>About Us</h2>
          <hr />
          <p>
            We are small development team in Turkey, focusing on making quality
            products and trying new and different techs for our customers to
            serve them best.
          </p>
        </div>
        <div className="mb-5">
          <h2>Our development team</h2>
          <hr />
          <div className="d-flex">
            <div className="me-3">
              <div>
                <img
                  src={avatar1}
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <Link to="https://github.com/quiloos39">@quiloos39</Link>
            </div>
            <div className="me-3">
              <div>
                <img
                  src={avatar2}
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <Link to="https://github.com/Dexess">@dexess</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
