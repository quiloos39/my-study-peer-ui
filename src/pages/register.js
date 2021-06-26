import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout/Layout";
import { Link } from "gatsby";
import Navbar from "../components/Navbar/Navbar";
import UniversityService from "../services/UniversityService";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const [universities, setUniversities] = useState({});
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [registerButtonClicked, setRegisterButtonClicked] = useState(false);

  useEffect(() => {
    UniversityService.getUniversityPrograms()
      .then((res) => {
        let temp = {};
        res.data.forEach((element) => {
          if (temp[element.universityName] === undefined) {
            temp[element.universityName] = [element.programName];
          } else {
            temp[element.universityName].push(element.programName);
          }
        });
        setUniversities(temp);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // setRegisterButtonClicked(true);
  };

  return (
    <Layout>
      <Navbar />
      <div className="container my-5">
        <h2>Registration</h2>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-lg-6">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                {...register("name")}
                required={true}
              />
            </div>
            <div className="col-lg-6">
              <label>Surname:</label>
              <input
                type="text"
                className="form-control"
                {...register("surname")}
                required={true}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>City:</label>
            <select className="form-select" {...register("city")} required={true}>
              <option>Ankara</option>
            </select>
          </div>

          <div className="mb-3">
            <label>University:</label>
            <select
              className="form-select"
              {...register("university")}
              onChange={(event) => {(
                universities[event.target.value] !== undefined &&
                  setSelectedUniversity(event.target.value));
              }}
              required={true}
            >
              <option>Other</option>
              {Object.keys(universities).map((university, index) => (
                <option key={index}>{university}</option>
              ))}
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              <label>Program:</label>
              <select
                className="form-select"
                disabled={selectedUniversity === null}
                {...register("program")}
                required={true}
              >
                {selectedUniversity !== null && universities[selectedUniversity].map((program, index) => (
                  <option key={index}>{program}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-3">
              <label>Class / Year:</label>
              <select className="form-select" {...register("class")} required={true}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label>Telephone Number:</label>
            <input
              type="tel"
              className="form-control"
              {...register("telephoneNumber")}
              required={true}
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              {...register("email")}
              required={true}
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
              required={true}
            />
          </div>
          <Link className="text-primary d-block mb-3" to="/login">
            Already have account ?
          </Link>
          <button type="submit" className="btn btn-success" disabled={registerButtonClicked}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
