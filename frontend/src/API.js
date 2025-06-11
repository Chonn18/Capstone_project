import axios from "axios";
const baseURL = "https://accurate-fair-guinea.ngrok-free.app" || " http://173.76.22.81:8000/";

const API = axios.create({
  baseURL : baseURL,
  // baseURL : "http://173.76.22.81:8080/",
});

export default API;
