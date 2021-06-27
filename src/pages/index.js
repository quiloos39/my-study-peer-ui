import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import imageStudents from "../images/eliott-reyna-kcT-7cirBEw-unsplash.jpg";
import getLocalProfile from "../helpers/GetLocalProfile";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import PostService from "../services/PostService";
import newsImage from "../images/news.jpeg";

const Loading = () => {
  return (
    <div
      className="spinner-border text-primary mb-3"
      role="status"
      style={{ width: "4rem", height: "4rem" }}
    />
  );
};

const News = () => {
  let [news, setNews] = useState(null);

  useEffect(() => {
    async function getNews() {
      axios
        .get("/api/news")
        .then((res) => {
          setNews(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getNews();
  }, []);

  const MainWindow = ({ news }) => {
    if (news.length === 0) {
      return (
        <div>
          <p>There is nothing to show you.</p>
        </div>
      );
    } else {
      return (
        <div className="row">
          {news.map((enew) => (
            <div key={enew.newsId} className="col-lg-3">
              <div
                className="mb-3"
                style={{ height: "200px", backgroundColor: "#3c73b6" }}
              >
                <img src={newsImage} className="w-100 h-100"/>
              </div>
              <h4>{enew.title}</h4>
              <p>{enew.description}</p>
              <p style={{ color: "#686868" }}>Date: {enew.creationDate}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h3>News</h3>
      <hr />
      {news === null ? <Loading /> : <MainWindow news={news} />}
    </div>
  );
};

const Profile = ({ profile, setProfile }) => {
  console.log(profile);
  if (profile === null) {
    return <Loading />;
  }

  const OwnedPosts = () => {
    if (profile.ownedPost.length === 0) {
      return <p>There is nothing to show you.</p>;
    } else {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
              </tr>
            </thead>
            <tbody>
              {profile.ownedPost.map((post, index) => (
                <tr key={post.postId}>
                  <td>{index + 1}</td>
                  <td>
                    <Link className="text-decoration-none" to={"/post?id=" + post.postId}>{post.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const MemberPosts = () => {
    if (profile.memberPost.length === 0) {
      return <p>There is nothing to show you.</p>;
    } else {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
              </tr>
            </thead>
            <tbody>
              {profile.memberPost.map((post, index) => (
                <tr key={post.postId}>
                  <td>{index + 1}</td>
                  <td>
                    <Link className="text-decoration-none" to={"/posts?id=" + post.postId}>{post.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const PostRequests = () => {
    const [localProfile, setLocalProfile] = useState(getLocalProfile());
    const [disabled, setDisabled] = useState(false);

    function acceptRejectStatus(targetUserId, postId, status) {
      setDisabled(true);
      PostService.changeStatusPostMember(
        localProfile.token,
        localProfile.id,
        postId,
        targetUserId,
        status
      )
        .then((res) => {
          setProfile({...profile, postRequest: profile.postRequest.filter(request => !(request.postId === postId && request.userId === targetUserId))});
          setDisabled(false);
        })
        .catch((err) => console.log(err));
    }

    if (profile.postRequest.length !== 0) {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>User</th>
              <th />
              <th />
            </tr>
            </thead>
            <tbody>
            {profile.postRequest.map((request, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={"/post?id=" + request.postId}>{request.title}</Link>
                </td>
                <td>
                  <Link
                    to={"/profile?id=" + request.userId}
                  >{`${request.name} ${request.surname}`}</Link>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-success btn-sm"
                    disabled={disabled}
                    onClick={() =>
                      acceptRejectStatus(
                        request.userId,
                        request.postId,
                        "accepted"
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={disabled}
                    onClick={() =>
                      acceptRejectStatus(
                        request.userId,
                        request.postId,
                        "rejected"
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (<span>There is nothing to show you.</span>)
    }

  };

  return (
    <div className="mb-5">
      <h3>Profile</h3>
      <hr />
      <h3>Welcome back {`${profile.name} ${profile.surname}`}</h3>
      <br />
      <div className="mb-3">
        <h4>Owned Posts</h4>
        <OwnedPosts />
      </div>
      <div className="mb-3">
        <h4>Post Requests</h4>
        <PostRequests />
      </div>
      <div className="mb-3">
        <h4>Subscribed Posts</h4>
        <MemberPosts />
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    ownedPost: PropTypes.array,
    memberPost: PropTypes.array,
  }),
};

const IndexPage = () => {
  let [profile, setProfile] = useState(null);
  // let [ownedPosts, setOwnedPosts] = useState(null);
  // let [memberPosts, setMemberPosts] = useState(null);

  const localProfile = getLocalProfile();

  useEffect(() => {
    if (localProfile) {
      PostService.getUserHomepagePosts(localProfile.token, localProfile.id)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  if (localProfile === null) {
    return (
      <Layout>
        <Navbar />
        <div className="container" style={{ padding: "50px 0" }}>
          <div className="row mb-5">
            <div className="col-lg-5 mb-3">
              <div style={{ marginBottom: "32px" }}>
                <div className="mb-3">
                  <h1 className="display-4">Student</h1>
                  <h1 className="display-4">networking</h1>
                  <h1 className="display-4">platform for nerds</h1>
                </div>
                <p className="lead" style={{ fontSize: "1.4rem" }}>
                  My study peer helps students find their soul study peers
                </p>
              </div>
              <div className="d-flex flex-row">
                <Link
                  className="btn btn-success btn-lg d-block w-100 me-3"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-danger btn-lg d-block w-100 me-3"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="col-lg-7 mb-3 h-100 order-first order-lg-last">
              <img
                className="w-100 h-100"
                src={imageStudents}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <News />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="container" style={{ padding: "50px 0" }}>
        <Profile profile={profile} setProfile={setProfile} />
        <News />
      </div>
    </Layout>
  );
};

export default IndexPage;
