import { all } from "redux-saga/effects";
import initSaga from "./init";
import createFileSaga from "./createFile";
import uploadFileSaga from "./uploadFile";

export default function* rootSaga() {
  yield all([
    initSaga(),
    createFileSaga(),
    uploadFileSaga()
  ]);
}
