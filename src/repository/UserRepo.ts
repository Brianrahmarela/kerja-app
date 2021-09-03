import axios from "../config/Axios";
import { AppConfig } from "../config/Config";
import { store } from "../redux/ConfigureStore";
export const getMe = () => {
    const token = window.localStorage.getItem("token");
    // const state = store.getState();
    return axios.get(AppConfig.url.getMe, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getUserSuggestion = (pagination: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getUserSuggestion, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: pagination,
    });
};

export const postFollowUser = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postFollowUser, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
