import { join, fork, put, takeEvery } from "redux-saga/effects";
import * as actionType from "../types";

function* createFileSaga(action) {
  const { file, id } = action.payload;
  try {
    const req = yield fork(createFileAPI, file);
    const res = yield join(req);
    yield put({ type: actionType.SET_STATUS_SUCCESS, payload: { data: { first: true }, id } });
    yield put({ type: actionType.CREATE_FILE_SUCCESS, payload: { data: { file, createdData: res.result }, id }});
  } catch (e) {
    yield put({ type: actionType.CREATE_FILE_FAILED, message: e.message });
  }
}

const createFileAPI = (file) => {
  const contentType = file.type || "application/octet-stream";

  return window.gapi.client
    .request({
      path: "https://www.googleapis.com/drive/v3/files", // !!! notice V3 in API version !!!
      method: "POST",
      headers: {
        "X-Upload-Content-Type": file.type,
        "X-Upload-Content-Length": file.size,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: {
        name: file.name,
        mimeType: contentType,
        "Content-Type": contentType,
        "Content-Length": file.size
      }
    })
}

function* createFile() {
  yield takeEvery(actionType.CREATE_FILE_REQUESTED, createFileSaga);
}

export default createFile;
