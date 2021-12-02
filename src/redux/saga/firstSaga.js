import { join, fork, put, takeEvery } from "redux-saga/effects";
import { getApi } from "./getApi";
import * as actionType from "../types";

function* fetchFirst(action) {
  const { id, url } = action.payload;
  try {
    const post = yield fork(getApi, `${url}/${id}`);
    const res = yield join(post);
    yield put({ type: actionType.SET_STATUS_SUCCESS, payload: { data: { first: true }, id } });
    yield put({ type: actionType.GET_FIRST_SUCCESS, payload: { id, url } });
  } catch (e) {
    yield put({ type: actionType.GET_FIRST_FAILED, message: e.message });
  }
}

function* firstSaga() {
  yield takeEvery(actionType.GET_FIRST_REQUESTED, fetchFirst);
  // Uncomment next line for endless loop of requests, also see src\redux\saga\secondSaga.js:13
  // yield takeEvery(actionType.GET_SECOND_SUCCESS", fetchFirst);
}

export default firstSaga;
