import axios from "axios";
import axiosCustom from "../config/Axios";

import { AppConfig } from "../config/Config";

export const postLogin = (payload: any) => {
    return axios.post(AppConfig.url.postLogin, payload);
};
export const postRegister = (payload: any) => {
    return axios.post(AppConfig.url.postRegister, payload);
};
export const postForgotPassword = (payload: any) => {
    return axios.post(AppConfig.url.postForgotPassword, payload);
};
export const postResetPassword = (payload: any) => {
    return axios.post(AppConfig.url.postResetPassword, payload);
};
export const getLogout = () => {
    const token = window.localStorage.getItem("token");
    return axiosCustom.get(AppConfig.url.getLogout, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postLoginGoogle = (payload: any) => {
    return axios.post(AppConfig.url.postLoginGoogle, payload);
};
export const postLoginFacebook = (payload: any) => {
    return axios.post(AppConfig.url.postLoginFacebook, payload);
};
export const getBgProfile = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getBgProfile, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
