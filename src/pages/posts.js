import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/layout";
import Navbar from "../components/navbar";

const authorStyle = {
  textDecoration: "none",
};

const PostEntry = ({ post, setSelectedPost, ...props }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          className="card-title mb-2 d-block"
          to={`/posts?id=${post.id}`}
          style={{ textDecoration: "none" }}
          onClick={() => setSelectedPost(post)}
        >
          <b>{post.title}</b>
        </Link>
        <Link
          className="card-subtitle mb-2 text-muted d-block"
          to={`/users?id=${post.author.id}`}
          style={{ textDecoration: "none" }}
        >
          {`${post.author.name} ${post.author.surname}`}
        </Link>
        <p className="card-text">{post.desc}</p>
      </div>
    </div>
  );
};

PostEntry.propTypes = {
  post: PropTypes.object,
  setSelectedPost: PropTypes.func,
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

const Comment = ({ comment, ...props }) => {
  return (
    <div className="p-3">
      <Link
        className="h5"
        style={authorStyle}
        to={`/users?id=${comment.id}`}
      >{`${comment.name} ${comment.surname}`}</Link>
      <hr />
      <p>{comment.comment}</p>
      <div>
        {[...Array(Math.ceil(comment.rating))].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} />
        ))}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

const TeamBoard = ({ teamMembers, ...props }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered border-dark">
        <thead>
          <tr>
            <td>Full name</td>
            <td>School</td>
            <td>Year</td>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
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
  );
};

TeamBoard.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object),
};

const Post = ({ post, setSelectedPost, ...props }) => {
  return (
    <div className="border border-dark p-4" {...props}>
      <div className="row">
        <div className="col-lg-7">
          <div className="mb-3">
            <h2>{post.title}</h2>
            <Link
              to={`/users?id=${post.author.id}`}
              className="h2"
              style={authorStyle}
            >{`${post.author.name} ${post.author.surname}`}</Link>
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
        <div className="col-lg-5">
          <h2>Team mates</h2>
          <hr />
          <TeamBoard teamMembers={post.teamMembers} />
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

const Posts = ({ posts, setSelectedPost, ...props }) => {
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
  posts: PropTypes.arrayOf(PropTypes.object),
  props: PropTypes.node,
};

const PostsPage = () => {
  let [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Looking for CNG 352 partner",
      author: {
        id: 1,
        name: "Mustafa",
        surname: "Aygun",
      },
      desc: "I am looking for partner that will motivate me.",
      teamMembers: [
        {
          id: 1,
          name: "Mustafa",
          surname: "Aygun",
          university: "METU",
          year: "3",
        },
        {
          id: 2,
          name: "Necdet",
          surname: "Efe",
          university: "METU",
          year: "3",
        },
      ],
      comments: [
        {
          id: 1,
          name: "Necdet",
          surname: "Efe",
          comment: "Amazing team mate had fun working with him.",
          rating: 4,
        },
        {
          id: 2,
          name: "Askar",
          surname: "Bozcan",
          comment: "Hello guys",
          rating: 3,
        },
      ],
    },
  ];

  let view;

  if (selectedPost == null) {
    view = <Posts posts={posts} setSelectedPost={setSelectedPost} />;
  } else {
    view = <Post post={selectedPost} setSelectedPost={setSelectedPost} />;
  }
  return (
    <Layout>
      <Navbar />
      <div className="container my-5">{view}</div>
    </Layout>
  );
};

export default PostsPage;
