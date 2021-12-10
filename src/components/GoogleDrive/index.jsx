import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGoogleDrive from "./useGoogleDrive";
import { createFile } from "../../redux/actions/create";
import { clearStatuses } from "../../redux/actions/clearStatuses";
import Semaphore from "../Semaphore";
import OrderTable from "../OrderTable";
import FileTable from "../FileTable";
import FileUpload from "../FileUpload";

const GoogleDrive = () => {
  const [files, setFiles] = useState();
  const [filesToUpload, setFilesToUpload] = useState();
  const { isInitialized, loadFiles } = useGoogleDrive();
  const fileUploadStatuses = useSelector((state) => state.status.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.gapi) return;
    triggerFileLoad(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  useEffect(() => {
    // if upload of all files is done, reset file input field so you can upload again
    if (fileUploadStatuses?.length !== filesToUpload?.length) return;
    if (Object.values(fileUploadStatuses).every((el) => el.first && el.second)) {
      dispatch(clearStatuses());
      document.getElementById("gfu").value = "";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploadStatuses]);

  const triggerFileLoad = (isSignedIn) => {
    if (isSignedIn) loadFiles(setFiles);
  }

  const handleUploadOfFileArray = (e) => {
    const files = e.target.files;
    setFilesToUpload(files);
    Object.values(files).map((file, idx) =>
      dispatch(createFile({ file, id: idx }))
    );
  }

  return (
    <>
      <OrderTable />
      <p>Google Drive API test</p>
      <button onClick={() => window.gapi.auth2.getAuthInstance().signIn()}>
        Authorize
      </button>
      <button onClick={() => window.gapi.auth2.getAuthInstance().signOut()}>
        Sign Out
      </button>
      <button onClick={loadFiles}>Show files</button>
      <FileTable files={files} />
      <FileUpload onChange={handleUploadOfFileArray} />
      {Object.values(filesToUpload || {})?.map((file, idx) => (
        <Semaphore          
          key={idx}
          id={idx}
          maxId={filesToUpload?.length}
        />
      ))}
    </>
  );
};

export default GoogleDrive;
