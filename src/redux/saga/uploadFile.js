import { join, fork, put, takeEvery } from "redux-saga/effects";
import * as actionType from "../types";

function* uploadFileSaga(action) {
  const { data, id } = action.payload;
  try {
    const post = yield fork(uploadFile, data);
    yield join(post);
    yield put({ type: actionType.SET_STATUS_SUCCESS, payload: { data: { second: true }, id } });
  } catch (e) {
    yield put({ type: actionType.UPLOAD_FILE_FAILED, message: e.message });
  }
}

const uploadFile = (createdFileData) => {
  const contentType = createdFileData.createdData.mimeType || "application/octet-stream";

  // note the difference, file update is API V2 and file creation is API V3
  // https://developers.google.com/drive/api/v2/reference/files/update#javascript
  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(createdFileData.file);
    reader.onload = function (e) {
      // Updating the metadata is optional and you can instead use the value from drive.files.get.
      const base64Data = btoa(reader.result);
      const multipartRequestBody =
        delimiter +
        "Content-Type: application/json\r\n\r\n" +
        JSON.stringify("fileMetadata") +
        delimiter +
        "Content-Type: " +
        contentType +
        "\r\n" +
        "Content-Transfer-Encoding: base64\r\n" +
        "\r\n" +
        base64Data +
        close_delim;

      window.gapi.client
        .request({
          path: `/upload/drive/v2/files/${createdFileData.createdData.id}`, // !!! notice V2 in API version !!!
          method: "PUT",
          params: { uploadType: "multipart", alt: "json" },
          headers: {
            "Content-Type": 'multipart/mixed; boundary="' + boundary + '"'
          },
          body: multipartRequestBody
        })
        .then((res) => resolve(res));
    };
})};

function* secondSaga() {
  yield takeEvery(actionType.CREATE_FILE_SUCCESS, uploadFileSaga);
}

export default secondSaga;
