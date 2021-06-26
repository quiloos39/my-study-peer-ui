import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import ConnectionFailed from "../components/FailedConnection/ConnectionFailed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import getLocalProfile from "../helpers/GetLocalProfile";
import PostService from "../services/PostService";

const Navigation = ({ pageNo, setPageNo, posts }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={pageNo === 1}
            onClick={() => {
              if (pageNo - 1 > 0) {
                setPageNo(pageNo - 1);
              }
            }}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => {
              if (posts.length > 0) {
                setPageNo(pageNo + 1);
              }
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  pageNo: PropTypes.number,
  setPageNo: PropTypes.func,
  posts: PropTypes.array,
};

const Posts = ({ posts, ...props }) => {
  if (posts === null) {
    return (
      <div className="d-flex align-items-center">
        <strong>Counting stars...</strong>
        <div className="spinner-border ms-auto text-primary" role="status" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div {...props}>
        <h3>Nothing to show here.</h3>
      </div>
    );
  }

  return (
    <div {...props}>
      {posts.map((post) => (
        <div key={post.postId} className="border p-3 mb-3">
          <h3>
            <Link
              to={"/post?id=" + post.postId}
              style={{ textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <h5>
            {post.authorName} {post.authorSurname}
          </h5>
          <h5>{post.creationDate}</h5>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      authorName: PropTypes.string,
      authorSurname: PropTypes.string,
    })
  ),
};

const PostsPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const [posts, setPosts] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [localProfile, setLocalProfile] = useState(getLocalProfile());

  useEffect(() => {
    PostService.getAllPost(pageNo)
      .then((res) => setPosts(res.data))
      .catch(() => setNetworkError(true));
  }, [pageNo]);

  if (networkError) {
    return (
      <Layout>
        <Navbar />
        <div className="container my-5 border p-3">
          <ConnectionFailed />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="container my-5 border p-3">
        <div>
          <Posts className="mb-3" posts={posts} />
          <Navigation posts={posts} pageNo={pageNo} setPageNo={setPageNo} />
          <div className="mb-3">
            {localProfile !== null && (
              <>
                <hr />
                <Link
                  className="btn btn-success"
                  type="button"
                  onClick={() => console.log("asd")}
                  to="/createpost"
                >
                  Add post
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostsPage;
