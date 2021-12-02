import { join, fork, put, takeEvery } from "redux-saga/effects";
import { getApi } from "./getApi";
import * as actionType from "../types";

function* fetchSecond(action) {
  const { id, url } = action.payload;
  try {
    const post = yield fork(getApi, `${url}/${id}`);
    const res = yield join(post);
    yield put({ type: actionType.SET_STATUS_SUCCESS, payload: { data: { second: true }, id } });
    // Uncomment next line for endless loop of requests, also see src\redux\saga\firstSaga.js:19
    // yield put({ actionType: "GET_SECOND_SUCCESS", payload: { id: res.id, url: `${apiUrl}/${res.id}` }});
  } catch (e) {
    yield put({ type: actionType.GET_SECOND_FAILED, message: e.message });
  }
}

function* secondSaga() {
  yield takeEvery(actionType.GET_FIRST_SUCCESS, fetchSecond);
}

export default secondSaga;
