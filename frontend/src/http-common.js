import axios from "axios";
// import { config } from "../../backend/models/db";

// .interceptors.response.use(response => {
//   return response
// }, (error) => {
//   if (error.response.status === 401) {
//       location.href = '/login'
//   } 
// }

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});


// export default axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

// http.interceptors.request.use(
//   function (config) {
//       const token = this.$store.token;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     return config;
//   },
//   function (error) {
//     Promise.reject(error);
//   } 
  
// );

export default http;