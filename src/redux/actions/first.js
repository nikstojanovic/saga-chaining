import * as type from "../types";

export const getFirst = (payload) => ({
  type: type.GET_FIRST_REQUESTED,
  payload
})
