import axios from "axios";
import { AppConfig } from "../config/Config";
import { store } from "../redux/ConfigureStore";

export const postLogin = (payload: any) => {
  return axios.post(AppConfig.url.postLogin, payload);
};
export const postRegister = (payload: any) => {
  return axios.post(AppConfig.url.postRegister, payload);
};
export const getLogout = () => {
  const state = store.getState();
  return axios.get(AppConfig.url.getLogout, {
    headers: {
      Authorization: "Bearer " + state.account.token,
    },
  });
};
