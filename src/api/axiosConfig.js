import axios from "axios";

export default axios.create({
  baseURL: "https://hairstyle-appointment-backend-production.up.railway.app/api", 
  headers: {
    "Content-Type": "application/json",
  },
});