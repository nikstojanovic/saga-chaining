import * as type from "../types";

export function getFirst(payload) {
  return {
    type: type.GET_FIRST_REQUESTED,
    payload
  };
}
