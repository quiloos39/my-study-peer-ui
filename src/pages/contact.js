import React from "react";
import Layout from "../components/layout";
import headerImage from "../images/alex-kulikov-BrunIOLQMfQ-unsplash.jpg";
import avatar from "../images/kisspng-rick-sanchez-morty-smith-pickle-rick-youtube-rick-rick-and-morty-5acb1188dd0a87.2585329315232577369054.png";
import Navbar from "../components/navbar";

const ContactPage = () => {
  return (
    <Layout>
      <Navbar />
      <div>
        <img
          src={headerImage}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-9">
            <div>
              <h2>Contact Us</h2>
              <hr />
              <p>
                You can contact us from{" "}
                <a href="mailto:support@mystudypeer.com">
                  <b>support@mystudypeer.com</b>
                </a>
                .
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <img src={avatar} style={{ width: "100%", height: "350px" }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
