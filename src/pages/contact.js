import React from "react";
import Layout from "../components/layout";
import headerImage from "../images/alex-kulikov-BrunIOLQMfQ-unsplash.jpg";
import avatar from "../images/472-4723269_transparent-pikachu-face-clip-art-pikachu-chibi-transparent.png";

const ContactPage = () => {
  return (
    <Layout>
      <img
        src={headerImage}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <div>
              <h2>Contact Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi expedita inventore itaque labore, nemo nesciunt
                obcaecati repudiandae. Delectus distinctio dolorum earum, et
                facilis iure laudantium molestiae molestias nihil, odit quae.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <img src={avatar} style={{ width: "100%", height: "350px" }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
