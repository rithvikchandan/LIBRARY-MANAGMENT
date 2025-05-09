
# 📚 Admin-Only Library Management System

A full-fledged **Admin Dashboard for Library Management**, built using **MongoDB**, **Express.js**, **Node.js**, and **HTML/CSS/JavaScript**.  
It features complete control over books, user tracking, issue/return operations, fine payments via **UPI QR code**, and a live **analytics dashboard**.

---

## 🚀 Features

### 📘 Book Management
- Add, edit, and delete books
- Categorize books by title, author, or genre
- Live search and filtering

### 🔄 Issue & Return System
- Admin can issue/return books
- Tracks due dates and return logs
- Shows all currently borrowed books

### 💰 Fine Collection via UPI
- Auto-calculates fine based on overdue days
- Displays dynamic **UPI QR Code** for payment
- Fine status marked as **paid/unpaid**

### 📊 Analytics Dashboard
- Total number of books, issued books, returned books, and total fine collected
- Beautiful UI with live stats for admin

### 🔐 Admin-Only Access
- Only admins can log in and access the full system
- Expandable to multiple roles (student/faculty)

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend     | Node.js, Express.js   |
| Database    | MongoDB + Mongoose    |
| Authentication | JWT + Bcrypt (optional) |
| Payment     | UPI QR Code (dynamic) |
| Hosting     | Firebase (optional)   |

---

## 📸 Screenshot – Admin Dashboard

![Admin Dashboard](https://github.com/rithvikchandan/LIBRARY-MANAGMENT/blob/main/Screenshot%202025-05-09%20091248.png?raw=true)

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rithvikchandan/LIBRARY-MANAGMENT.git
cd LIBRARY-MANAGMENT
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

Create a `.env` file in the root folder with the following:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Start the backend server

```bash
node server.js
```

### 5. Open Frontend

Open `index.html` or `admin_dashboard.html` in a browser to begin using the system.

---

## 📂 Folder Structure

```
📁 LIBRARY-MANAGEMENT
├── 📁 backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── 📁 frontend
│   ├── index.html
│   ├── admin_dashboard.html
│   └── ...
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🙌 Developed By

Mahindra University


---

## 📄 License

This project is licensed under the **MIT License**.

```

