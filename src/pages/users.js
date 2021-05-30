import React from "react";
import queryString from "query-string";
import { Link } from "gatsby";
import {
  faBirthdayCake,
  faBriefcase,
  faCalendar,
  faHome,
  faStar,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import isBrowser from "../helpers/is_browser";
import Layout from "../components/layout";
import Navbar from "../components/navbar";

const Feedback = ({ ...props }) => {
  return (
    <div {...props}>
      <h4 className="mb-2">Necdet Efe</h4>
      <Link to="#" className="link">
        Looking for CNG 352 partner
      </Link>
      <p className="date">20.02.1999</p>
      <hr />
      <p>Amazing team mate had fun working with him.</p>
      <FontAwesomeIcon icon={faStar} />
    </div>
  );
};

const Profile = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="mb-3">
          <h1>Mustafa Aygun</h1>
        </div>
        <div className="mb-3">
          <h2>About</h2>
          <hr />
          <p>
            <FontAwesomeIcon icon={faBirthdayCake} /> <b>Birth date:</b>{" "}
            20-02-1999{" "}
          </p>
          <p>
            <FontAwesomeIcon icon={faHome} /> <b>City:</b> Ankara
          </p>
          <p>
            <FontAwesomeIcon icon={faUniversity} /> <b>University:</b> METU
          </p>
          <p>
            <FontAwesomeIcon icon={faBriefcase} /> <b>Program:</b> Computer
            engineering
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> <b>Year:</b> 3
          </p>
        </div>
        <div className="mb-3">
          <h2>Posts</h2>
          <hr />
          <Link to="#" className="link">
            Looking for CNG 352 partner
          </Link>
        </div>
        <div className="mb-3">
          <h2>Feedbacks</h2>
          <hr />
          <div className="row">
            <div className="col-lg-8">
              {[1].map((_, index) => (
                <Feedback key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersPage = () => {
  let params = {};

  if (isBrowser) {
    params = queryString.parse(window.location.search);
  }

  let view;

  if (params.id !== undefined) {
    view = <Profile />;
  } else {
    view = <h1>User not found.</h1>;
  }

  const user = {
    id: 1,
    name: "Mustafa",
    surname: "Aygun",
    posts: {},
  };

  return (
    <Layout>
      <Navbar />
      <div className="container my-4">{view}</div>
    </Layout>
  );
};

export default UsersPage;
