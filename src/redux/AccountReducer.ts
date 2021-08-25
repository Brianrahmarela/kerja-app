const INITIAL_STATE = {
  token: "",
  refreshToken: "",
  expiredAt: 0,
  currentUser: null,
};

export function accountReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_TOKEN":
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("refreshToken", action.payload.refreshToken);
      window.localStorage.setItem("expiredAt", action.payload.expiredAt);
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        expiredAt: action.payload.expired,
      };
    case "LOGOUT": {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.localStorage.removeItem("expiredAt");
      return {
        token: "",
        refreshToken: "",
        expiredAt: 0,
        currentUser: null,
        savedToken: "",
        savedRefreshToken: "",
      };
    }
    default:
      return state;
  }
}
