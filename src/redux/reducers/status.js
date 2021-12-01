import * as type from "../types";

const initialState = {
  status: {},
  orderOfExecution: {},
  loading: false,
  error: null
};

export default function status(state = initialState, action) {
  switch (action.type) {
    case type.SET_STATUS_SUCCESS:
      const { id, data } = action.payload;
      const setOfApiCalls = Object.keys(data)[0];
      return {
        ...state,
        loading: false,
        status: {
          ...state.status,
          [id]: {
            ...state.status[id],
            ...data
          }
        },
        orderOfExecution: {
          ...state.orderOfExecution,
          [setOfApiCalls]: [
            ...(state.orderOfExecution[setOfApiCalls] || []),
            id
          ]
        }
      };
    case type.SET_STATUS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      };
    case type.SET_STATUS_CLEAR:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
