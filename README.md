# 🏏 HitTrack - Frontend

**HitTrack** is a cricket shot learning and practice tracking platform that helps players improve their shot selection and consistency.  
This repository contains the **React frontend** of the application.

---

## 🚀 Features

- ✨ User-friendly interface with responsive design
- 📝 Player login and profile management
- 📚 Learn various cricket shots with visual aids
- ✅ Track daily shot practice and performance
- 🔄 Integrates with a Django REST backend API

---

## 🔧 Tech Stack

- ⚛️ **React JS**
- 📦 **React Router**
- 🔗 **Axios** (for API requests)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Prathish-tech/Project2-HitTrack-Frontend-.git
cd Project2-HitTrack-Frontend-
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Start the Development Server
```bash
npm start
```
By default, it runs on:
📍 http://localhost:3000

## 🌐 API Integration
Make sure the Django backend is running at the correct API URL.
Update the API base URL in your frontend code (e.g., axios.defaults.baseURL or .env):

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

## 📁 Folder Structure (Basic)
```pgsql
hit-track/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── index.js
├── .env
├── .gitignore
├── README.md
└── package.json
```

## 🙌 Author
Prathish S

🔗 GitHub Profile:" Prathish-tech"

## 📃 License
This project is licensed under the MIT License.



