import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init } from "../../redux/actions/init";

import ExecutionOrderTable from "../ExecutionOrderTable";
import FileUpload from "../FileUpload";

const GoogleDrive = () => {
  const isInitialized = useSelector((state) => state.init.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [])

  return isInitialized ? (
    <>
      <p>Google Drive API test</p>
      <FileUpload />
      <ExecutionOrderTable />
    </>
  ) : (
    <p>... initializing Google API</p>
  );
};

export default GoogleDrive;
