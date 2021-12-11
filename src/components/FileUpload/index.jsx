import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStatuses } from "../../redux/actions/clearStatuses";
import { createFileReq } from "../../redux/actions/create";
import Semaphore from "../Semaphore";
import './style.css';

const COMPONENT_ID = "GDFU";

const FileUpload = () => {
  const [filesToUpload, setFilesToUpload] = useState();
  const fileUploadStatuses = useSelector((state) => state.status.status);
  const dispatch = useDispatch();

  useEffect(() => {
    // if upload of all files is done, reset file input field so you can upload again
    if (Object.keys(fileUploadStatuses || {}).length !== filesToUpload?.length)
      return;
    if (Object.values(fileUploadStatuses).every((el) => el.first && el.second))
      document.getElementById(COMPONENT_ID).value = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploadStatuses]);

  const handleUploadOfFileArray = (e) => {
    dispatch(clearStatuses());
    const files = e.target.files;
    setFilesToUpload(files);
    Object.values(files).map((file, idx) =>
      dispatch(createFileReq({ file, id: idx + 1 }))
    );
  };

  return (
    <div className="file-upload">
      <div className="file-upload__input-wrapper">
        <input
          id={COMPONENT_ID}
          className="file-upload__input"
          type="file"
          name="files"
          accept="*"
          onChange={handleUploadOfFileArray}
          hidden
          multiple
        ></input>
        <label htmlFor={COMPONENT_ID} className="file-upload__input-label">
          Click here to upload files
        </label>
      </div>
      {Object.values(filesToUpload || {})?.map((file, idx) => (
        <Semaphore
          key={idx}
          id={idx + 1}
          name={file.name}
          maxId={filesToUpload?.length}
        />
      ))}
    </div>
  );
};

export default FileUpload;
