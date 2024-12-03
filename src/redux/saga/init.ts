import { call, put, takeEvery } from "redux-saga/effects";
import * as actionType from "../types";

function* initializeGoogleAPISaga() {
  try {
    const res = yield call(initializeGoogleDrive);
    if (!res) return;
    yield put({ type: actionType.INIT_SUCCESS });
  } catch (e) {
    yield put({ type: actionType.INIT_FAILED, message: e.message });
  }
}

const initializeGoogleDrive = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
    script.src = "https://apis.google.com/js/api.js";
  })
    .then(() => {
      return new Promise((resolve) => {
        window.gapi.load("client:auth2", resolve);
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        const DISCOVERY_DOCS = [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
        ];
        const SCOPE = "https://www.googleapis.com/auth/drive";
        // ex. you can add .readonly to SCOPE to dissalow writing functions
        // https://developers.google.com/drive/api/v3/reference/files/create#auth
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GDRIVE_APIKEY,
            clientId: process.env.REACT_APP_GDRIVE_CID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPE
          })
          .then(() => {
            resolve(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            // window.gapi.auth2.getAuthInstance().isSignedIn.listen();
          })
          .catch((err) => reject(err));
      });
    });
};

function* initSaga() {
  yield takeEvery(actionType.INIT_REQUESTED, initializeGoogleAPISaga);
}

export default initSaga;
