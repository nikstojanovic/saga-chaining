import * as type from "../types";

export const createFile = (payload) => ({
  type: type.CREATE_FILE_REQUESTED,
  payload
})
