import axios from "axios";
import { AppConfig } from "../config/Config";
const token = window.localStorage.getItem("token");
export const getMe = () => {
    return axios.get(AppConfig.url.getMe, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getUserSuggestion = (pagination: any) => {
    return axios.get(AppConfig.url.getUserSuggestion, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: pagination,
    });
};

export const postFollowUser = (payload: any) => {
    return axios.post(AppConfig.url.postFollowUser, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
