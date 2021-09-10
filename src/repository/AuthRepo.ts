import axios from "axios";
import axiosCustom from "../config/Axios";

import { AppConfig } from "../config/Config";
import { store } from "../redux/ConfigureStore";

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
    const state = store.getState();
    return axiosCustom.get(AppConfig.url.getLogout, {
        headers: {
            Authorization: "Bearer " + state.account.token,
        },
    });
};
export const getBgProfile = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getBgProfile, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
