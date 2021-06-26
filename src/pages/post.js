import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import getLocalProfile from "../helpers/GetLocalProfile";
import CommentService from "../services/CommentService";
import PostService from "../services/PostService";
import getSearchParameters from "../helpers/GetSearchParameters";
import getPermission from "../helpers/GetPermission";
import isBrowser from "../helpers/is_browser";

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

const TeamMembers = ({ teamMembers, ...props }) => {
  if (teamMembers.length === 0) {
    return <p>There is nothing to show.</p>;
  } else {
    return (
      <div {...props}>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>University</th>
                <th>Program</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>
                    <Link
                      className="text-decoration-none"
                      to={"/profile?id=" + member.userId}
                    >
                      {member.name} {member.surname}
                    </Link>
                  </th>
                  <th>{member.universityName}</th>
                  <th>{member.programName}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

const Comments = ({ postId, permissionLevel }) => {
  const { handleSubmit, register } = useForm();
  const [comments, setComments] = useState([]);
  const [commentButtonDisabled, setCommentButtonDisabled] = useState(false);
  let localProfile = getLocalProfile();

  useEffect(() => {
    CommentService.getComment(postId)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = ({ comment }) => {
    setCommentButtonDisabled(true);
    CommentService.sendComment(
      comment,
      localProfile.token,
      postId,
      localProfile.id
    )
      .then((res) => {
        CommentService.getComment(postId)
          .then((res) => {
            setComments(res.data);
            setCommentButtonDisabled(false);
          })
          .catch((err) => {
            console.error(err);
            setCommentButtonDisabled(false);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mb-3">
      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments to show</p>}
      {comments.map((comment) => (
        <div key={comment.commentId} className="p-3 mb-3 border">
          <h4>
            <Link
              className="text-decoration-none"
              to={"/profile?id=" + comment.commenterUserId}
            >
              {comment.commenterName} {comment.commenterSurname}
            </Link>
          </h4>
          <h5 className="text-muted">{comment.commentDate}</h5>
          <hr />
          <p>{comment.commentText}</p>
        </div>
      ))}
      {permissionLevel > 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            minLength={1}
            className="w-100 mb-3"
            {...register("comment")}
            required={true}
          />

          <button
            className="btn btn-success"
            style={buttonStyle}
            disabled={commentButtonDisabled}
          >
            {commentButtonDisabled && (
              <span
                className="spinner-border text-dark spinner-border-sm"
                role="status"
              />
            )}
            <span> Send</span>
          </button>
        </form>
      )}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentDate: PropTypes.string,
      commentId: PropTypes.number,
      commentText: PropTypes.string,
      commenterName: PropTypes.string,
      commenterSurname: PropTypes.string,
    })
  ),
};

const buttonStyle = { maxWidth: "100px", width: "100%" };

const Post = ({ post, pageNo, setPost }) => {
  if (post === null) {
    return <Loading />;
  }
  console.log(post);
  const [editing, setEditing] = useState(false);
  const [permissionLevel, setPermissionLevel] = useState(getPermission(post));
  const [localProfile, setLocalProfile] = useState(getLocalProfile());

  const Title = () => {
    if (editing) {
      return (
        <div className="mb-3">
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder={"Title"}
            defaultValue={post.post.title}
          />
        </div>
      );
    } else {
      return <h1>{post.post.title}</h1>;
    }
  };

  const Course = () => {
    if (editing) {
      return (
        <div className="mb-3">
          <input
            id="course"
            type="text"
            className="form-control"
            placeholder={"Course"}
            defaultValue={post.post.course}
          />
        </div>
      );
    } else {
      return <h3>{post.post.course}</h3>;
    }
  };

  const AuthorNameSurname = () => {
    return (
      <h3>
        <Link
          className="text-decoration-none"
          to={"/profile?id=" + post.post.userId}
        >
          {" "}
          {post.post.authorName} {post.post.authorSurname}
        </Link>
      </h3>
    );
  };

  const CreationDate = () => {
    return <h5 className="text-muted">{post.post.creationDate}</h5>;
  };

  const Tags = () => {
    return (
      <div>
        {post.postTags.map((tag, index) => (
          <span key={index} className="badge bg-dark me-2">
            {tag.postTagId.tag}
          </span>
        ))}
      </div>
    );
  };

  const Description = () => {
    if (editing) {
      return (
        <div>
          <h3>Description</h3>
          <textarea
            id="description"
            className="w-100"
            defaultValue={post.post.description}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Description</h3>
          <p>{post.post.description}</p>
        </div>
      );
    }
  };

  const Settings = ({ permissionLevel, editing, setEditing }) => {
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    function deletePost() {
      PostService.deletePost(
        localProfile.token,
        localProfile.id,
        post.post.postId
      )
        .then((res) => {
          if (isBrowser) {
            window.location.href = "/";
          }
        })
        .catch((err) => {});
    }

    function toggleModify() {
      if (editing) {
        setEditing(false);
        if (isBrowser) {
          let description = document.getElementById("description").value;
          let title = document.getElementById("title").value;
          let course = document.getElementById("course").value;
          PostService.modifyPost(
            localProfile.token,
            localProfile.id,
            post.post.postId,
            title,
            description,
            course
          )
            .then((res) => setPost({...post, post: res.data}))
            .catch((err) => console.log(err));
        }
      } else {
        setEditing(true);
      }
    }

    if (permissionLevel === 2) {
      return (
        <div>
          <h3>Post Options</h3>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Settings
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <button
                    className={
                      "btn me-2 " + (editing ? "btn-success" : "btn-primary")
                    }
                    onClick={() => toggleModify()}
                  >
                    {editing ? "Save" : "Modify"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#remove"
                  >
                    Delete Post
                  </button>
                  <div className="modal fade" id="remove" tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Are you sure you want to remove this post ?
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          You can't revert this operation after its being done
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deletePost()}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const Controls = () => {
    const [applied, setApplied] = useState(false);

    function applyPost() {
      setApplied(true);
      PostService.applyPost(
        localProfile.token,
        localProfile.id,
        post.post.postId
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    return (
      <div>
        <Link
          to="/posts"
          state={{ pageNo: pageNo }}
          className="btn btn-secondary me-2"
          style={buttonStyle}
        >
          Back
        </Link>
        {permissionLevel === 0 && localProfile !== null && (
          <button
            type="button"
            className="btn btn-primary me-2"
            style={buttonStyle}
            disabled={applied}
            onClick={() => applyPost()}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="p-3 border">
        <div>
          <Title />
          <Course />
          <AuthorNameSurname />
          <CreationDate />
          <Tags />
        </div>
        <hr />
        <div>
          <h3>Team Members</h3>
          <TeamMembers teamMembers={post.teammates} />
        </div>

        <Description />
        <Settings
          permissionLevel={permissionLevel}
          editing={editing}
          setEditing={setEditing}
        />
        <hr />
        <div>
          <Comments
            postId={post.post.postId}
            permissionLevel={permissionLevel}
          />
          <hr />
          <Controls />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  pageNo: PropTypes.number,
};

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [params, setParams] = useState(getSearchParameters);
  const [pageNo, setPageNo] = useState(1);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    PostService.getPost(params.id)
      .then((res) => setPost(res.data))
      .catch((err) => setNetworkError(true));
  }, []);

  if (params.id === undefined) {
    return (
      <Layout>
        <Navbar />
        <div className="container my-5 border p-3">
          <h3>Please enter valid ID.</h3>
        </div>
      </Layout>
    );
  }

  if (networkError) {
    return (
      <Layout>
        <Navbar />
        <div className="container my-5 border p-3">
          <h3>Couldn't able to communicate with server.</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="container my-5">
        <Post post={post} pageNo={pageNo} setPost={setPost} />
      </div>
    </Layout>
  );
};

export default PostPage;
