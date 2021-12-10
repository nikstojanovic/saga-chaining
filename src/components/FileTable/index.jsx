import React from "react";

const FileTable = ({files}) => {
  return (
    <table>
      {files?.map((file) => (
        <tr key={file.id}>
          <td>
            <b>{file.id}</b>&nbsp;
          </td>
          <td>{file.name}</td>
        </tr>
      ))}
    </table>
  );
};

export default FileTable;
