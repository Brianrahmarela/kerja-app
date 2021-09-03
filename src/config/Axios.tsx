import axios from "axios";
// import { AppConfig } from "./Config";
// import { store } from "../redux/ConfigureStore";
// interceptoor ini berguna ketika token sudah EXPIRED jadi otomatis renew token dan retry submisison
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        console.log(err.status);
        if (err.response && err.response.status === 401) {
            window.location.hash = "/login";
        }
        return Promise.reject(err);
    }
);

export default axios;
