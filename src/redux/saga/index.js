import { all } from "redux-saga/effects";
import firstSaga from "./firstSaga";
import secondSaga from "./secondSaga";

export default function* rootSaga() {
  yield all([
    firstSaga(),
    secondSaga()
  ]);
}
