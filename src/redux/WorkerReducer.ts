const INITIAL_STATE = {
  experienceList: [],
  educationList: [],
  skillList: [],
  certificationList: [],
};

export function workerReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "SET_EXPERIENCE": {
      return {
        ...state,
        experienceList: action.payload,
      };
    }
    case "SET_EDUCATION": {
      return {
        ...state,
        educationList: action.payload,
      };
    }
    case "SET_SKILL": {
      return {
        ...state,
        skillList: action.payload,
      };
    }
    case "SET_CERTIFICATION": {
      return {
        ...state,
        certificationList: action.payload,
      };
    }

    default:
      return state;
  }
}
