import axios from "../config/Axios";
import { AppConfig } from "../config/Config";

export const postFeed = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postPosting, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getFeed = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getFeed, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};
export const postReaction = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postReaction, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postComment = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postComment, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postSubComment = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postSubComment, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postEditPost = (payload: any, postId: string) => {
    console.log(postId);

    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postEditPost, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: {
            postId,
        },
    });
};
export const postNotificationAsRead = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postNotificationAsRead, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getCommentPost = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getCommentPost, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};
export const getCommentReplies = (params: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getCommentReplies, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
};

export const getPostLikes = (postId: any) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getPostLikes + postId, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
