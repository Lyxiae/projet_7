import axios from "axios";

// axios.interceptors.response.use(response => {
//   return response
// }, (error) => {
//   if (error.response.status === 401) {
//       location.href = '/login'
//   } 
// }

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});