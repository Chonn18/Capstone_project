import axios from "axios";

const API = axios.create({
      // baseURL: "http://localhost:8000/",
      baseURL: "http://173.76.22.81:8000/",
});

export default API;
