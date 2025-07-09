# 🌐 Job Application Frontend

This is the **frontend** of the Job Application Platform. It Signup page as landing page, user signup/login with **JWT authentication**, and automatic **role assignment** based on email domain.
---
## 📌 Features

- Landing page  
- Signup & Login with JWT authentication  
- Role-based access:  
  - 👨‍💼 **Admin**: if email domain ends with `@arnifi.com`  
  - 🙋 **User**: if email domain is anything **other than** `@arnifi.com`  
- Sends signup/login data to the backend API  
- Stores user/admin data securely in the database via backend  
- **State management with Redux Toolkit and Redux Thunk for async API calls and updates**

---
## 🧠 Role Assignment Logic
When a user signs up:

- If their email **ends with `@arnifi.com`**, they are assigned the **admin** role  
- If their email domain is **anything other than `@arnifi.com`** (including `@arnifinext.com`), they are assigned the **user** role

> Examples:  
> - `alice@arnifi.com` → **Admin**  
> - `bob@gmail.com` → **User**  
> - `carol@arnifinext.com` → **User**

---

## 🧪 Pages

- `/` → Landing page  
- `/signup` → Signup form (Name, Email, Password, etc.)  
- `/login` → Login form  
- Protected user/admin routes after login (based on JWT & role)

---

## 🔐 Authentication Flow

- User submits email and password  
- Frontend calls backend API (`/auth/signup` or `/auth/login`) via **Redux Thunk async actions**  
- Backend assigns role based on email domain  
- On success, frontend stores `accessToken` (JWT) securely in Redux state or local storage  
- Token is sent with future requests to access protected routes

---

## 🔄 Redux Toolkit & Thunk Usage

- **Redux Toolkit** is used for efficient state management  
- **Redux Thunk** handles asynchronous API calls such as signup, login, fetching jobs, and updating job posts  
- Actions and reducers are organized feature-wise (e.g., auth slice, jobs slice)  
- Async thunks dispatch loading, success, and error states to update the UI accordingly

---

## 📦 Technologies

- React.js (Vite or Create React App)  
- Axios for API calls  
- React Router for navigation  
- Tailwind CSS or other UI framework  
- **Redux Thunk** for state and async logic  
- JWT for authentication

---

