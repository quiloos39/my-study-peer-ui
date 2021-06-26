import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import ConnectionFailed from "../components/FailedConnection/ConnectionFailed";
import getLocalProfile from "../helpers/GetLocalProfile";
import getSearchParameters from "../helpers/GetSearchParameters";
import UserService from "../services/UserService";

const Feedbacks = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return <p>There is nothing to show.</p>;
  } else {
    return (
      <div>
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="mb-3 p-3"
            style={{ backgroundColor: "#e7e7e7" }}
          >
            <h4 className="mb-2">{`${feedback.name} ${feedback.surname}`}</h4>
            <Link
              className="text-decoration-none"
              to={"/post?id=" + feedback.forPost}
            >
              Post: {feedback.feedbackTitle}
            </Link>
            <p className="date">Date: {feedback.feedbackDate}</p>
            <hr />
            <p>{feedback.feedbackText}</p>
            {Array.from(Array(Math.floor(feedback.feedbackPoints)).keys()).map(
              (_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} />
              )
            )}
          </div>
        ))}
      </div>
    );
  }
};

const Posts = ({ posts }) => {
  if (posts.length === 0) {
    return <p>There is nothing to show.</p>;
  } else {
    console.log(posts);
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.postId}>
            <Link
              className="d-block text-decoration-none"
              to={"/post?id=" + post.postId}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
};

const Profile = ({ profile, params }) => {
  if (profile === null) {
    return <Loading />;
  }

  const [localProfile, setLocalProfile] = useState(getLocalProfile());

  const Username = () => {
    return (
      <div className="mb-3">
        <h1>{`${profile.user.name} ${profile.user.surname}`}</h1>
      </div>
    );
  };

  const RegisterDate = () => {
    return (
      <div className="mb-3">
        <FontAwesomeIcon icon={faBirthdayCake} />
        <b> Register date: </b>
        <span>{profile.user.registerDate}</span>
      </div>
    );
  };

  const City = () => {
    return (
      <div className="mb-3">
        <FontAwesomeIcon icon={faHome} />
        <b> City: </b>
        <span>{profile.user.city}</span>
      </div>
    );
  };

  const University = () => {
    return (
      <div className="mb-3">
        <FontAwesomeIcon icon={faUniversity} />
        <b> University: </b>
        <span>{profile.user.universityName}</span>
      </div>
    );
  };

  const Program = () => {
    return (
      <div className="mb-3">
        <FontAwesomeIcon icon={faBriefcase} /> <b>Program:</b> Computer
        engineering
      </div>
    );
  };

  const UserClass = () => {
    return (
      <div className="mb-3">
        <FontAwesomeIcon icon={faCalendar} />
        <b> Year: </b>
        <span>{profile.user.userClass}</span>
      </div>
    );
  };

  const Controls = () => {
    return (
      <div>
        {localProfile !== null && localProfile.id === parseInt(params.id) && (
          <div>
            <button className="btn btn-primary">Modify</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Username />
      <div className="mb-3">
        <h3>About</h3>
        <hr />
        <RegisterDate />
        <City />
        <University />
        <Program />
        <UserClass />
      </div>
      <div className="mb-3">
        <h3>Posts</h3>
        <hr />
        <div>
          <Posts posts={profile.posts} />
        </div>
      </div>
      <div className="mb-3">
        <h3>Feedbacks</h3>
        <hr />
        <Feedbacks feedbacks={profile.feedbacks} />
      </div>
      <Controls />
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  params: PropTypes.object,
};

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [params, setParams] = useState(getSearchParameters());

  useEffect(() => {
    if (params.id !== undefined && !isNaN(params.id)) {
      UserService.getUserProfile(params.id)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          setError(true);
          console.error(err);
        });
    }
  }, []);

  const Content = () => {
    if (params.id === undefined) {
      return <h1>User not found!</h1>;
    } else if (isNaN(params.id)) {
      return <h1>Invalid User ID!</h1>;
    } else {
      if (error) {
        return <ConnectionFailed />;
      }
      return <Profile profile={profile} params={params} />;
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="container my-4">
        <Content />
      </div>
    </Layout>
  );
};

export default ProfilePage;
