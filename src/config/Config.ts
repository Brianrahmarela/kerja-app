let baseUrl = "http://localhost:7777";

// uat / prod
if (process.env.NODE_ENV === "production") {
  baseUrl = window.location.origin;
}

const baseUrlApi = baseUrl + "/api";
const baseUrlWs = baseUrl;
export const AppConfig = {
  baseUrlApi,
  baseUrlWs,
  recaptchaKey:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "6LeecDsaAAAAAP6cBwmX-WFAqpgdWGMBbDJe0Jbu"
      : "6LcE5UAaAAAAAJBA5_pW_bXNjEEdft806G30DpzZ",
  hashKey: "qFaqv?TB@Sdc6Erk!9_a",
  firebaseConfig: {
    apiKey: "AIzaSyBA2UE3aQWmOgTNBcPm-ddCARC75u9uYcQ",
    authDomain: "karirapp.firebaseapp.com",
    projectId: "karirapp",
    storageBucket: "karirapp.appspot.com",
    messagingSenderId: "201582228511",
    appId: "1:201582228511:web:7948ea99359063e6ae912a",
    measurementId: "G-RLS397RKBH",
  },
  url: {
    postLogin: baseUrlApi + "/ka-auth/v1/login",
  },
};
