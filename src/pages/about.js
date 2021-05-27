import React from "react";
import Layout from "../components/layout";
import headerImage from "../images/alex-kulikov-BrunIOLQMfQ-unsplash.jpg";

const AboutPage = () => {
  return (
    <Layout>
      <img
        src={headerImage}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div className="container my-5">
        <div>
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            expedita inventore itaque labore, nemo nesciunt obcaecati
            repudiandae. Delectus distinctio dolorum earum, et facilis iure
            laudantium molestiae molestias nihil, odit quae.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
