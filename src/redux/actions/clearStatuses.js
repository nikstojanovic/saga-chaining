import * as type from "../types";

export function clearStatuses(payload) {
  return {
    type: type.SET_STATUS_CLEAR,
    payload
  };
}
