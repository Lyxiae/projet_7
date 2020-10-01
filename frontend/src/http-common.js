import axios from "axios";
let token = localStorage.getItem('token');

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: 'Bearer ' + token
  }
});


export default http;