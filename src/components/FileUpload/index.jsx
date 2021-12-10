import React from "react";

const FileUpload = ({onChange}) => {
  return (
    <input
      id="gfu"
      type="file"
      name="files"
      accept="*"
      onChange={onChange}
      multiple
    ></input>
  );
};

export default FileUpload;
