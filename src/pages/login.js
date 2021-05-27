import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const LoginPage = () => {
  return (
    <Layout className="vh-100" style={{ backgroundColor: "#0f3a65" }}>
      <div className="container my-5 text-white">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <hr />
            <form>
              <div className="mb-3">
                <label>Email:</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label>Password:</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <Link className="text-primary d-block mb-3" to="/register">
                {"Doesn't have account ?"}
              </Link>
              <button type="button" className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
