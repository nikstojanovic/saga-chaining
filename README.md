# Google Drive file upload - React Saga async chaining 10-12-2021

## Setup

1. Rename .env.example file to .env.local and fill in your Google API credentials - ID and API key

2. Install packages:
> npm install

3. ... then run the app:
> npm start

It'll run on port 3000 by default. App is available at http://localhost:3000.<br><br>

## Use case

Uploading images to Google Drive may have the following <mark>flow</mark>:
- you first have to `CREATE` a file
- ... to be able to `UPLOAD` it

Let's say you are creating React file upload component. It'll show files and their upload statuses. Files that have failed in any of the upload stages (getting credentials, uploading, upload confirmation) may be reuploaded. If you have 3 files, you'd like to try to upload them simultaneously, so you'll trigger Sagas with some sort of loop. Receiving responses should also be async. Instead of having to wait for the two stage process to end for every single file, you trigger first request for 3 files at the same time, then receive their responses as they are resolved, and trigger other requests related to the first request.

Every <mark>flow</mark> has a unique ID. In this case, IDs are just numbers. That way once async action is resolved (or failed) we know how to save that info.

Real case example, three file flows in two stages:
1. Create File Saga: trigger `CREATE` request for three files with IDs 0 (1kB), 1 (12MB) and 2 (1kB)
2. Create File Saga: you receive success response for `CREATE` action, but async, in different order 1, 2 and 0
3. Upload File Saga: start `UPLOAD`ing files in 1, 2, 0 order, they are of different size and their upload will resolve asynchronously
4. Upload File Saga: files 0 and 2 are super small and their `UPLOAD` resolves almost instantly
5. Upload File Saga: we store information that files 0 and 2 have both stages successfull and that have been uploaded
6. Upload File Saga: file 1 `UPLOAD` is resolved after several seconds and status is saved in store<br><br>

## Current implementation

When request is resolved, it will be shown above "Google Drive API test" heading. This is just an indicator of order of execution.
Next to file upload input field, several indicators will appear. They show stages of file upload, first indicator is related to file creation, second one is for file upload. They are red if pending or unsuccessfull and green if they are successfull.<br><br>

## Special note

Checkout commit with hash `0d4fe662ffb5c5ca5b617041161cd6fa6efef718` (10-12-2021) to see more generalized async testing dashboard.
This commit contains several input fields that allow you to configure number of API calls and API endpoint to test and see how async actions behave in case of many chained async calls.