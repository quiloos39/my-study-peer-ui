import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Layout from "../components/Layout/Layout";
import { Link } from "gatsby";
import { useForm } from "react-hook-form";
import getLocalProfile from "../helpers/GetLocalProfile";
import PostService from "../services/PostService";
import isBrowser from "../helpers/is_browser";
import sleep from "../helpers/sleep";

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [localProfile, setLocalProfile] = useState(getLocalProfile());
  const [status, setStatus] = useState(null);

  const onSubmit = (data) => {
    setCreateButtonDisabled(true);
    let tags = data.tags.split(",");
    PostService.createPost(
      localProfile.token,
      localProfile.id,
      data.title,
      data.course,
      data.description,
      tags
    )
      .then((res) => {
        setStatus({ message: "Succesfully added post redirecting you to post page.", status: "success" });
        console.log(res.data);
        (async () => {
          sleep(2000);
          if (isBrowser) {
            window.location.href = "/post?id=" + res.data;
          }
        })();
      })
      .catch((err) => {
        setStatus({ message: "Something went wrong", status: "fail" });
        setCreateButtonDisabled(false);
      });
  };

  return (
    <Layout>
      <Navbar />
      <div className="container my-5">
        {status !== null && (
          <div
            className={
              "alert " + (status.status === "success"
                ? "alert-success"
                : "alert-danger") + " mb-3"
            }
            role="alert"
          >
            {status.message}
          </div>
        )}
        <h2>Create Post</h2>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              {...register("title")}
            />
          </div>
          <div className="mb-3">
            <label>Course:</label>
            <input
              type="text"
              className="form-control"
              {...register("course")}
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              type="text"
              className="form-control"
              {...register("description")}
            />
          </div>
          <div className="mb-3">
            <label>Tags: (Comma separated list)</label>
            <input
              type="text"
              className="form-control"
              {...register("tags")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success me-2"
              disabled={createButtonDisabled}
            >
              {createButtonDisabled && (
                <span
                  className="spinner-border text-dark spinner-border-sm"
                  role="status"
                />
              )}
              <span> Create</span>
            </button>
            <Link className="btn btn-danger me-2" to="/posts">
              Back
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
