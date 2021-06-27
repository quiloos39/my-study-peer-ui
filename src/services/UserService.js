import axios from "axios";

class UserService {
  static async getUserProfile(id) {
    return axios.get("/api/users/profile?id=" + id);
  }
  static async registerUser(email, name, surname, password, city, telno, userClass, programName, universityName) {
    return axios.post("/api/users/register", {
      email: email,
      name: name,
      surname: surname,
      password: password,
      city: city,
      telno: telno,
      userClass: userClass,
      progName: programName,
      uniName: universityName
    });
  }

  static async getAvailableFeedBacks(targetUserId, userId) {
    return axios.post("/api/users/profile", {
      id: userId,
      givenBy: targetUserId
    })
  }

  static async giveFeedBack(token, targetUserId, userId, title, description, rating, postId) {
    console.log(token, targetUserId, userId, title, description, rating, postId);
    return axios.post("/api/users/feedback/create", {
      token: token,
      givenBy: userId,
      givenTo: targetUserId,
      feedbackTitle: title,
      feedbackText: description,
      feedbackPoints: rating,
      forPost: postId
    })
  }

  static async updateUserInfo(token, userId, year, city) {
    return axios.put("/api/users/profile", {
      token: token,
      id: userId,
      userClass: year,
      city: city
    });
  }
}

export default UserService;