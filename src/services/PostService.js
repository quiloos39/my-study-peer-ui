import axios from "axios";
import post from "../pages/post";

class PostService {
  static async getPost(postId) {
    return axios.get("/api/post?id=" + postId);
  }

  static async createPost(token, userId, title, course, description, postTags) {
    return axios.post(
      "/api/post/create",
      {
        token: token,
        id: userId,
        title: title,
        course: course,
        description: description,
        postTags: postTags,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  static async changeStatusPostMember(
    token,
    targetUserId,
    postId,
    applierUserId,
    status
  ) {
    console.log(applierUserId);
    return axios.put("/api/request/update", {
      userId: targetUserId,
      token: token,
      postId: postId,
      applierUserId: applierUserId,
      status: status,
    });
  }

  static async getUserHomepagePosts(token, id) {
    return axios.post("/api/users/posts", {
      token: token,
      id: id,
    });
  }

  static async applyPost(token, userId, postId) {
    return axios.post("/api/request/apply", {
      token: token,
      userId: userId,
      postId: postId,
    });
  }

  static async deletePost(token, userId, postId) {
    return axios.post("/api/post/delete", {
      token: token,
      userId: userId,
      postId: postId,
    });
  }

  static async getAllPost(pageNo) {
    return axios.get("/api/posts?page=" + pageNo);
  }

  static async modifyPost(token, userId, postId, title, description, course) {
    return axios.put("/api/post/update", {
      token: token,
      userId: userId,
      postId: postId,
      title: title,
      description: description,
      course: course
    })
  }
}

export default PostService;
