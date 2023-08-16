# Petstagram

## Description
Full stack MERN web application with auth where you can post pictures of your pets and add comments. Also, you can filter posts based on pet categories.

## Feautures
* CRUD posts and comments
* Image Upload Page supports preview and deletion of images.
* Filter posts based on pet categories.
* Login, Logout, and Register.
* Authentication and Authorization both on client and server.
* User error feedback

## Screenshots
<img src="https://res.cloudinary.com/dz5atgdtb/image/upload/v1692153152/KakaoTalk_Photo_2023-08-16-11-26-18_001_yu6xzu.jpg" width="90%"></img>
<br/>
<img src="https://res.cloudinary.com/dz5atgdtb/image/upload/v1692153153/KakaoTalk_Photo_2023-08-16-11-26-18_003_cuq3hh.jpg" width="90%"></img>
<img src="https://res.cloudinary.com/dz5atgdtb/image/upload/v1692153152/KakaoTalk_Photo_2023-08-16-11-26-18_002_dieoso.jpg" width="90%"></img>

## Run Program Locally

Set .env file in the backend folder.

Backend folder
```
npm install
node src/app.js
```

Frontend folder
```
npm install
npm run dev
```
## Technologies

* Frontend:
  * React
  * React-Redux & Redux-Toolkit
  * React-Router
  * Axios
  * js-cookie

* Backend:
  * Express
  * Mongoose & MongoDB
  * bcryptjs
  * jsonwebtoken
  * multer
