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
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        expiredAt: action.payload.expired,
      };
    case "LOGOUT": {
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
