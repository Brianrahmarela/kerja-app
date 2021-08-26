const INITIAL_STATE = {
  notifList: [],
  countNotif: 0,
  countNewPost: 0,
};

export function notifReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "SET_COUNT_NEW_POST": {
      return {
        ...state,
        countNewPost: action.payload,
      };
    }
    case "SET_COUNT_NOTIF": {
      return {
        ...state,
        countNotif: action.payload,
      };
    }
    case "SET_NOTIF_LIST": {
      return {
        ...state,
        notifList: action.payload,
      };
    }

    default:
      return state;
  }
}
