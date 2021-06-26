import axios from "axios";

class CommentService {
  static async sendComment(comment, token, postId, userId) {
    return axios.post(
      "/api/comments",
      {
        commentText: comment,
        token: token,
        postId: postId,
        userId: userId,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
  static async getComment(postId) {
    return axios.get(
      "/api/comments?postId=" + postId,
    );
  }
}

export default CommentService;
