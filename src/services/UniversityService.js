import axios from "axios";

class UniversityService {
  static async getUniversityPrograms() {
    return axios.get("/api/university");
  }
}

export default UniversityService;