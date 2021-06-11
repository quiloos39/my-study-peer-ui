import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Navbar from "../components/navbar";
import "../mock/posts";

const authorStyle = {
  textDecoration: "none",
};

const PostCard = ({ post, setSelectedPost, ...props }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          className="card-title mb-2 d-block"
          to={`/posts?id=${post.id}`}
          style={{ textDecoration: "none", fontSize: "1.3rem" }}
          onClick={() => setSelectedPost(post)}
        >
          {post.title}
        </Link>
        <Link
          className="card-subtitle mb-2 text-muted d-block"
          to={`/users?id=${post.author.id}`}
          style={{ textDecoration: "none", fontSize: "1.1rem" }}
        >
          {`${post.author.name} ${post.author.surname}`}
        </Link>
        <p className="card-text">{post.desc}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  setSelectedPost: PropTypes.func,
};

const Navigator = ({ setPage }) => {
  return (
    <nav>
      <ul className="pagination mb-0">
        <li className="page-item disabled">
          <button className="page-link">Previous</button>
        </li>
        <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">2</button>
        </li>
        <li className="page-item">
          <button className="page-link">3</button>
        </li>
        <li className="page-item">
          <button className="page-link">Next</button>
        </li>
      </ul>
    </nav>
  );
};

Navigator.propTypes = {
  setPage: PropTypes.func,
};

const Comment = ({ comment, ...props }) => {
  return (
    <div>
      <Link
        className="h5"
        style={authorStyle}
        to={`/users?id=${comment.id}`}
      >{`${comment.name} ${comment.surname}`}</Link>
      <p>20.09.2000</p>
      <p>{comment.comment}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

const MembersTable = ({ members, ...props }) => {
  return (
    <div {...props}>
      <h2>Team members</h2>
      <hr />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <td>Full name</td>
              <td>School</td>
              <td>Year</td>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/users?id=${member.id}`}
                    style={authorStyle}
                  >{`${member.name} ${member.surname}`}</Link>
                </td>
                <td>{member.university}</td>
                <td>{member.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MembersTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};

const Post = ({ post, setSelectedPost, ...props }) => {
  return (
    <div {...props}>
      <div>
        <div className="mb-3">
          <div className="mb-3">
            <h2>{post.title}</h2>
            <h3 style={{ color: "#b6b6b6" }}>{post.creationDate}</h3>
          </div>
        </div>
        <div className="mb-3">
          <h3>Description</h3>
          <hr />
          <p>{post.desc}</p>
        </div>
        <div className="mb-3">
          <h3>Comments</h3>
          <hr />
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  setSelectedPost: PropTypes.func,
  props: PropTypes.node,
};

const Loading = () => {
  return (
    <div className="d-flex align-items-center">
      <strong>Counting stars...</strong>
      <div
        className="spinner-border ms-auto text-primary"
        role="status"
        aria-hidden="true"
      />
    </div>
  );
};

const Author = ({ selectedPost }) => {
  return (
    <div className="mb-3">
      <h2>Author</h2>
      <hr />
      <Link
        to={``}
        style={{ textDecoration: "none", fontSize: "2rem" }}
      >{`${selectedPost.author.name} ${selectedPost.author.surname}`}</Link>
    </div>
  );
};

Author.propTypes = {
  selectedPost: PropTypes.object,
};

const PostsPage = () => {
  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);

  // Fetching data here.
  useEffect(() => {
    async function fetchPosts() {
      axios
        .get("/api/posts")
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          setPosts([]);
          console.log(error);
        });
    }

    fetchPosts();
  }, [page]);

  // Depending on state display different views.
  const View = () => {
    // Still didn't fetched data.
    if (posts === null) {
      return <Loading />;
    } else {
      // Fetched data but no post selected.
      if (selectedPost === null) {
        return (
          <div>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                setSelectedPost={setSelectedPost}
              />
            ))}
            <Navigator setPage={setPage} />
          </div>
        );

        // Fetched data and post selected.
      } else {
        return (
          <div>
            <div className="row">
              <Post
                className="col-lg-8"
                post={selectedPost}
                setSelectedPost={setSelectedPost}
              />
              <div className="col-lg-4">
                <Author selectedPost={selectedPost} />
                <MembersTable members={selectedPost.members} />
                <div>
                  <div className="mb-3">
                    <button
                      className="btn btn-success me-2"
                      disabled={true}
                      style={{ width: "120px" }}
                    >
                      Join
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => setSelectedPost(null)}
                      style={{ width: "120px" }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="container my-5 border p-3">
        <View />
      </div>
    </Layout>
  );
};

export default PostsPage;
