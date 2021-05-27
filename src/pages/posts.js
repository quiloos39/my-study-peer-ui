import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Layout from "../components/layout";

let posts = [
  {
    id: 1,
    title: "Looking for CNG 351 partner",
    author: "Necdet Efe",
    desc: "I am looking for partner that will motivate me.",
  },
  {
    id: 2,
    title: "Looking for CNG 351 partner",
    author: "Necdet Efe",
    desc: "I am looking for partner that will motivate me.",
  },
  {
    id: 3,
    title: "Looking for CNG 351 partner",
    author: "Necdet Efe",
    desc: "I am looking for partner that will motivate me.",
  },
  {
    id: 4,
    title: "Looking for CNG 351 partner",
    author: "Necdet Efe",
    desc: "I am looking for partner that will motivate me.",
  },
  {
    id: 5,
    title: "Looking for CNG 351 partner",
    author: "Necdet Efe",
    desc: "I am looking for partner that will motivate me.",
  },
];

const PostEntry = ({ post, setSelectedPost, ...props }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          className="card-title mb-2 d-block"
          to={`/posts?id=${post.post_id}`}
          style={{ textDecoration: "none" }}
          onClick={() => setSelectedPost(post)}
        >
          <b>{post.title}</b>
        </Link>
        <Link
          className="card-subtitle mb-2 text-muted d-block"
          to={`/users?id=${post.author_id}`}
          style={{ textDecoration: "none" }}
        >
          {post.author}
        </Link>
        <p className="card-text">{post.desc}</p>
      </div>
    </div>
  );
};

PostEntry.propTypes = {
  post: PropTypes.object,
  setSelectedPost: PropTypes.func,
  props: PropTypes.node,
};

const Navigator = () => {
  return (
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
  );
};

const Post = ({ post, setSelectedPost, ...props }) => {
  return (
    <div className="border p-3" {...props}>
      <h2>{post.title}</h2>
      <Link to="/users">{post.author}</Link>
      <hr />
      <p>{post.desc}</p>
      <button
        className="btn btn-success"
        onClick={() => setSelectedPost(null)}
        style={{ width: "120px" }}
      >
        Back
      </button>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  setSelectedPost: PropTypes.func,
  props: PropTypes.node,
};

const Posts = ({ setSelectedPost, ...props }) => {
  return (
    <div>
      <div>
        {posts.map((post) => (
          <PostEntry
            key={post.id}
            post={post}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </div>
      <Navigator />
    </div>
  );
};

Posts.propTypes = {
  setSelectedPost: PropTypes.func,
  props: PropTypes.node,
};

const PostsPage = () => {
  let [selectedPost, setSelectedPost] = useState(null);

  let view;
  if (selectedPost == null) {
    view = <Posts setSelectedPost={setSelectedPost} />;
  } else {
    view = <Post post={selectedPost} setSelectedPost={setSelectedPost} />;
  }
  return (
    <Layout>
      <div className="container my-5">{view}</div>
    </Layout>
  );
};

export default PostsPage;
