import axios from "axios";

const connection = axios.create({
    baseURL: "http://localhost:10001"
});


export default connection;