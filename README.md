# 📚 Library Management System

A full-featured **Library Management System** built using **MongoDB**, **Express.js**, **Node.js**, and **HTML/CSS/JS** frontend.  
This system manages books, users (students/faculty/admin), fines, and borrowing history, all with role-based access.

---

## 🚀 Features

### ✅ User Roles
- **Admin**: Full control over books, users, fines, and issue/return.
- **Student**: View books, request issues, see personal fine and history.
- **Faculty**: Extended privileges compared to students (customizable).

### 📖 Book Management
- Add, edit, delete books
- Categorize by genre/author
- Search and filter books

### 👥 User Management
- Create student/faculty accounts
- Role-based dashboard
- Authentication with secure login

### 🔁 Issue / Return System
- Track issued books
- View due dates
- Auto-calculate fines

### 💰 Fine Calculator
- Automatically computes fines based on overdue days
- Admin can mark fines as paid/unpaid

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend     | Node.js, Express.js   |
| Database    | MongoDB (Mongoose)    |
| Auth        | JWT + Bcrypt          |
| Hosting     | Firebase (optional)   |

---

## 📂 Folder Structure

```

📁 LIBRARY-MANAGEMENT
├── 📁 backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
├── 📁 frontend
│   ├── index.html
│   ├── dashboard.html
│   └── ...
├── .env
├── .gitignore
├── README.md
└── package.json

````

---

## ⚙️ Installation & Usage

### 1. Clone the repo
```bash
git clone https://github.com/rithvikchandan/LIBRARY-MANAGMENT.git
cd LIBRARY-MANAGMENT
````

### 2. Install backend dependencies

```bash
npm install
```

### 3. Setup `.env` file

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
node server.js
```

### 5. Open `index.html` in browser to use the frontend

---

## 📸 Screenshots

> Add your screenshots here if available
> Example:
> [![Dashboard Preview](./screenshots/dashboard.png)](https://github.com/rithvikchandan/LIBRARY-MANAGMENT/blob/main/Screenshot%202025-05-09%20091248.png)

---

## 🙌 Acknowledgements

* Mahindra University Project


---

## 📄 License

This project is licensed under the MIT License.

```

---

Would you like me to create a `.gitignore` file for Node.js and MongoDB as well?
```
