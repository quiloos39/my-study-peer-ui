import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "gatsby";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import isBrowser from "../helpers/is_browser";
import sleep from "../helpers/sleep";

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
  status: PropTypes.object,
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = (data) => {
    setLoginButtonDisabled(true);

    async function sendUserLoginData() {
      axios
        .post("/api/users/login", {
          email: data.email,
          password: data.password,
        }, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(async (resp) => {
          setStatus({
            message: "Successfully logged in redirecting you to homepage.",
            success: true,
          });
          if (isBrowser) {
            window.localStorage.setItem("profile", JSON.stringify(resp.data));
          }
          setLoginButtonDisabled(false);
          await sleep(2000);
          if (isBrowser) {
            window.location.href = "/";
          }
        })
        .catch((err) => {
          if (err.response) {
            setStatus({ message: "Invalid username or password.", success: false });
          } else if (err.request) {
            setStatus({ message: "Server is unavailable.", success: false });
          } else {
            setStatus({ message: "Something went wrong.", success: false });
          }
          setLoginButtonDisabled(false);
        });
    }
    sendUserLoginData();

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
