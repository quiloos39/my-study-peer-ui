import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const RegisterPage = () => {
  return (
    <Layout>
      <div className="container my-5">
        <h2>Registration</h2>
        <hr />
        <form>
          <div className="row mb-3">
            <div className="col-lg-6">
              <label>Name:</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="col-lg-6">
              <label>Surname:</label>
              <input type="text" className="form-control" id="surname" />
            </div>
          </div>
          <div className="mb-3">
            <label>City:</label>
            <select className="form-select"></select>
          </div>
          <div className="mb-3">
            <label>University:</label>
            <select className="form-select"></select>
          </div>
          <div className="row mb-3">
            <div className="col-lg-9">
              <label>Program:</label>
              <select className="form-select" disabled={true}></select>
            </div>
            <div className="col-lg-3">
              <label>Class / Year:</label>
              <select className="form-select" disabled={true}></select>
            </div>
          </div>

          <div className="mb-3">
            <label>Telephone Number:</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <Link className="text-primary d-block mb-3" to="/login">
            Already have account ?
          </Link>
          <button type="button" className="btn btn-success">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
