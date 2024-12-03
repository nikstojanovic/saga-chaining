import * as type from "../types";

const initialState = {
  status: false,
  loading: false,
  error: '',
};

export default function init(state = initialState, action) {
  switch (action.type) {
    case type.INIT_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case type.INIT_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false
      };
    case type.INIT_FAILED:
      return {
        ...state,
        loading: false,
        status: false,
        error: action.message
      };
    default:
      return state;
  }
}
