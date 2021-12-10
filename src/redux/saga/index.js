import { all } from "redux-saga/effects";
import createFileSaga from "./createFile";
import uploadFileSaga from "./uploadFile";

export default function* rootSaga() {
  yield all([
    createFileSaga(),
    uploadFileSaga()
  ]);
}
