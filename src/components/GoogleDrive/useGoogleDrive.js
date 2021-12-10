import { useState, useEffect } from "react";

const initializeGoogleDrive = (setInitialized) => {
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
  ];
  // you can add .readonly to allow/dissalow functions https://developers.google.com/drive/api/v3/reference/files/create#auth
  const SCOPE = "https://www.googleapis.com/auth/drive";

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
      return window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_GDRIVE_APIKEY,
          clientId: process.env.REACT_APP_GDRIVE_CID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPE
        })
        .then(() => {
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(setInitialized);
          setInitialized(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        })
        .catch((err) => alert(JSON.stringify(err)));
    });
};

const loadFiles = (setFiles) => {
  if (!window.gapi) return;
  window.gapi.client.drive.files
    .list({
      pageSize: 5,
      fields: "nextPageToken, files(id, name)"
    })
    .then((response) => {
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          setFiles([...files, file.name + " (" + file.id + ")"]);
        }
      } else {
        setFiles("No files found.");
      }
    });
}

const useGoogleDrive = () => {
  const [isInitialized, setGoogleDriveInit] = useState(false);

  const onInit = (status) => {
    setGoogleDriveInit(status);
  };

  useEffect(() => {
    initializeGoogleDrive(onInit);
  }, []);

  return { isInitialized, loadFiles };
}

export default useGoogleDrive;
