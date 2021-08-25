import axios from "axios";
import { AppConfig } from "../config/Config";
import { store } from "../redux/ConfigureStore";
export const getMe = () => {
  const state = store.getState();
  return axios.get(AppConfig.url.getMe, {
    headers: {
      Authorization: "Bearer " + state.account.token,
    },
  });
};
