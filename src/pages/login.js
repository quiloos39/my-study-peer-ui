import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import "../mock/user";

const StatusMessage = ({ status }) => {
  return (
    <div
      className={`alert ${status.success ? "alert-success" : "alert-danger"}`}
      role="alert"
    >
      {status.message}
    </div>
  );
};

StatusMessage.propTypes = {
  status: PropTypes.objectOf({
    message: PropTypes.string,
    success: PropTypes.bool,
  }),
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    setLoginButtonDisabled(true);
    axios
      .post("/api/user", {
        email: data.email,
        password: data.password,
      })
      .then((resp) => {
        setStatus({
          message: "Successfully logged in redirecting you to homepage.",
          success: 1,
        });
        setProfile(data);
        setLoginButtonDisabled(false);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({ message: "Invalid username or password.", success: 0 });
        } else if (err.request) {
          setStatus({ message: "Server is unavailable.", success: 0 });
        } else {
          setStatus({ message: "Something went wrong.", success: 0 });
        }
        console.error(err);
        setLoginButtonDisabled(false);
      });
  };

  return (
    <Layout
      className="vh-100"
      style={{ backgroundColor: "#0f3a65", overflowY: "auto" }}
    >
      <Navbar />
      <div className="container my-5 text-white">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <hr />
            {status !== null && <StatusMessage status={status} />}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                />
              </div>
              <div className="mb-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                />
              </div>
              <Link className="text-primary d-block mb-3" to="/register">
                {"Doesn't have account ?"}
              </Link>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loginButtonDisabled}
              >
                {loginButtonDisabled && (
                  <span
                    className="spinner-border text-dark spinner-border-sm"
                    role="status"
                  />
                )}
                <span> Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
