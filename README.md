# React Saga async chaining 02-12-2021

## Use case

Uploading images to Amazon S3 may have the following <span style="color: red">flow</span>:
- get `CREDENTIALS` from authorization server
- `UPLOAD` data to Amazon S3
- `CONFIRM` that uploads were successful

Let's say you are creating React file upload component. It'll show files and their upload statuses. Files that have failed in any of the upload stages (getting credentials, uploading, upload confirmation) may be reuploaded. If you have 3 files, you'd like to try to upload them simultaneously, so you'll trigger Sagas with some sort of loop. Receiving responses should also be async. Instead of having to wait for the three stage process to end for every single file, you trigger first request for 3 files at the same time, then receive their responses as they are resolved, and trigger other requests related to the first request.

Every <span style="color: red">flow</span> has a unique ID. In this case, IDs are just numbers. That way once async action is resolved (or failed) we know how to save that info.

Example of single file flow with three stages:
1. get `CREDENTIALS` for file upload of first file (id: 1)
2. `UPLOAD` first file to Amazon S3 (id: 1)
3. `CONFIRM` first file upload (id: 1)

Real case example, three files flow with three stages:
1. Saga 1: trigger get `CREDENTIALS` for files with IDs 1, 2 and 3
2. Saga 1: you recieve `CREDENTIALS` for files with IDs 1, 2 and 3 but async in different order 3, 1 and 2
3. Saga 2: start `UPLOAD`ing files in 3, 1, 2 order, they are of different size and their upload will resolve asynchronously
4. Saga 2: file 1 was the smallest and it already `UPLOAD`ed no matter that his uploading action was triggered second
5. Saga 3: `CONFIRM` upload of file 1
6. Saga 2: files 2 and 3 were of similar size, now their `UPLOAD` is resolved
7. Saga 3: `CONFIRM` upload of file 2
8. Saga 3: `CONFIRM` upload of file 3

## Current implementation


## Setup

Install packages:
> npm install

... then run the app:
> npm start