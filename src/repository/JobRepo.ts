import { AppConfig } from "../config/Config";
import axios from "../config/Axios";

export const getSearchJob = (params: any) => {
    return axios.get(AppConfig.url.getJobVacation, {
        params,
    });
};
export const postJobApplication = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postJobApplication, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getMyApplicationJob = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getMyApplicationJob, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};
export const getTimeline = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getTineline, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};
export const getJobBookmark = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getJobBookmark, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};
export const getJobVacationDetail = (id: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getJobVacationDetail + "/" + id, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getJobVacationDetailSlug = (slug: any) => {
    return axios.get(AppConfig.url.getJobVacationDetailSlug + "/" + slug);
};
export const postApplicationWidthraw = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postApplicationWidthraw, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postBookmarkJob = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postJobBookmark, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
