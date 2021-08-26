import axios from "axios";
import { AppConfig } from "../config/Config";
const token = window.localStorage.getItem("token");
export const getFeed = (params: any) => {

  return axios.get(AppConfig.url.getFeed, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params,
  });
};
export const postReaction = (payload: any) => {
  
  return axios.post(AppConfig.url.postReaction, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const postComment = (payload: any) => {
  
  return axios.post(AppConfig.url.postComment, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const postSubComment = (payload: any) => {
  
  return axios.post(AppConfig.url.postSubComment, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const postEditPost = (payload: any, postId: string) => {
  console.log(postId);
  
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
  
  return axios.post(AppConfig.url.postNotificationAsRead, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const getCommentPost = (params: any) => {
  

  return axios.get(AppConfig.url.getCommentPost, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params,
  });
};
export const getCommentReplies = (params: any) => {
  

  return axios.get(AppConfig.url.getCommentReplies, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params,
  });
};