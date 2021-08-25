import axios from "axios";
import { AppConfig } from "../config/Config";

export const postLogin = (payload: any) => {
  return axios.post(AppConfig.url.postLogin, payload);
};
export const postRegister = (payload: any) => {
  return axios.post(AppConfig.url.postRegister, payload);
};
