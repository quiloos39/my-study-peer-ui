import React from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";

const Card = ({ title, author, desc }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
        <p className="card-text">{desc}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  desc: PropTypes.string,
};

const PostsPage = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div>
          <Card text="asd" title="asd" />
          <Card text="asd" title="asd" />
          <Card text="asd" title="asd" />
          <Card text="asd" title="asd" />
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default PostsPage;
