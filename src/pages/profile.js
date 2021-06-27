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
import { useForm } from "react-hook-form";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import ConnectionFailed from "../components/FailedConnection/ConnectionFailed";
import getLocalProfile from "../helpers/GetLocalProfile";
import getSearchParameters from "../helpers/GetSearchParameters";
import UserService from "../services/UserService";
import UniversityService from "../services/UniversityService";
import isBrowser from "../helpers/is_browser";

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
              Feedback Title: {feedback.feedbackTitle}
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

const Profile = ({ setProfile, profile, params }) => {
  if (profile === null) {
    return <Loading />;
  }

  const [feedbacks, setFeedbacks] = useState(null);
  const [localProfile, setLocalProfile] = useState(getLocalProfile());
  const [editing, setEditing] = useState(false);
  const [university, setUniversity] = useState(null);
  console.log(params.id, localProfile.id);
  useEffect(() => {
    if (localProfile !== null && localProfile.id !== params.id) {
      UserService.getAvailableFeedBacks(localProfile.id, params.id)
        .then((res) => setFeedbacks(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

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
    if (editing) {
      return (
        <div className="mb-3">
          <FontAwesomeIcon icon={faHome} />
          <b> City: </b>
          <select defaultValue={profile.user.city} id="city">
            <option>Ankara</option>
            <option>Antalya</option>
          </select>
        </div>
      );
    } else {
      return (
        <div className="mb-3">
          <FontAwesomeIcon icon={faHome} />
          <b> City: </b>
          <span>{profile.user.city}</span>
        </div>
      );
    }
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
    if (editing) {
      return (
        <div className="mb-3">
          <FontAwesomeIcon icon={faCalendar} />
          <b> Year: </b>
          <select defaultValue={profile.user.userClass} id="year">
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
          </select>
        </div>
      );
    } else {
      return (
        <div className="mb-3">
          <FontAwesomeIcon icon={faCalendar} />
          <b> Year: </b>
          <span>{profile.user.userClass}</span>
        </div>
      );
    }
  };

  const Controls = () => {
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    console.log(profile);
    function saveModification() {
      if (editing) {
        setDisableSaveButton(true);
        let year = document.getElementById("year").value;
        let city = document.getElementById("city").value;
        UserService.updateUserInfo(
          localProfile.token,
          localProfile.id,
          year,
          city
        )
          .then((res) => {
            let newProfile = {...profile, user: {...profile.user, city: city, year: year}};
            setProfile(newProfile);
            setDisableSaveButton(false);
            setEditing(!editing);
            if (isBrowser) {
              location.reload();
            }
          })
          .catch((err) => console.log(err));
      } else {
        setEditing(!editing);
      }
    }

    return (
      <div>
        {localProfile !== null && localProfile.id === parseInt(params.id) && (
          <div>
            <button
              className={"btn " + (editing ? "btn-success" : "btn-primary")}
              onClick={() => saveModification()}
              disabled={disableSaveButton}
            >
              {editing ? "Save" : "Modify"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const GiveFeedBack = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(false);
    const [saveButtonClicked, setSaveButtonClicked] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      let postId = document.getElementById("postId").value;
      UserService.giveFeedBack(
        localProfile.token,
        params.id,
        localProfile.id,
        data.title,
        data.description,
        data.rating,
        postId
      )
        .then((res) => {
          if (isBrowser) {
            location.reload();
          }
        })
        .catch((err) => console.log(err));
    };

    if (feedbacks !== null && feedbacks.length > 0) {
      return (
        <div className="mb-3">
          <h4>Available feedbacks</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <select
                className="form-select"
                onChange={() => setSelectedFeedback(true)}
                defaultValue={""}
                id={"postId"}
              >
                <option value="" disabled={true} />
                {feedbacks.map((feedback, index) => (
                  <option key={index} value={feedback.postId}>
                    {feedback.title}
                  </option>
                ))}
              </select>
            </div>
            {selectedFeedback && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    minLength={1}
                    {...register("title")}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder={"Description"}
                    rows={4}
                    className="w-100"
                    minLength={1}
                    {...register("description")}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    defaultValue={0}
                    {...register("rating")}
                  >
                    <option disabled={true} value={0}>
                      Rating
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                {
                  <div className="mb-3">
                    <button
                      type="submit"
                      disabled={saveButtonClicked}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                  </div>
                }
              </>
            )}
          </form>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div>
      <Username />
      <h3>Rating: {profile.rating}</h3>
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
        <GiveFeedBack />
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
      return (
        <Profile profile={profile} params={params} setProfile={setProfile} />
      );
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
