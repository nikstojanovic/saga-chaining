import { all } from "redux-saga/effects";
import initSaga from "./init.ts";
import createFileSaga from "./createFile";
import uploadFileSaga from "./uploadFile.ts";

export default function* rootSaga() {
  yield all([
    initSaga(),
    createFileSaga(),
    uploadFileSaga()
  ]);
}
