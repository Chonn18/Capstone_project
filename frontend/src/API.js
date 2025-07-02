import axios from "axios";
const baseURL = "https://accurate-fair-guinea.ngrok-free.app" || " localhost:8000/";

const API = axios.create({
  baseURL : baseURL,
});

export default API;
