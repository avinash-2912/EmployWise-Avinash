import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://reqres.in",
  
});

export default apiRequest;