import axios from "axios";

class UserService {
  static async getUserProfile(id) {
    return axios.get("/api/users/profile?id=" + id);
  }

}

export default UserService;