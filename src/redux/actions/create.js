import * as type from "../types";

export const createFileReq = (payload) => ({
  type: type.CREATE_FILE_REQUESTED,
  payload
})
