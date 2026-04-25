<h1 align="center">🌾 Farmer-Buyer Direct Marketplace Portal</h1>

<p align="center">
  <b>Connecting Farmers 🤝 Buyers — No Middlemen, Just Value</b><br/>
  <i>Full-stack marketplace web application built with modern technologies</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

---

## 📌 Overview

<div align="center">

🚜 A **full-stack marketplace platform** that enables farmers to sell products directly to buyers.

💡 Eliminates intermediaries, ensuring **better pricing and transparency**.

</div>

---

## ✨ Key Features

<ul>
  <li>👤 Role-based login (Farmer & Buyer)</li>
  <li>🛒 Cart & Order Management</li>
  <li>🔍 Product Search & Filtering</li>
  <li>📦 Product CRUD for Farmers</li>
  <li>📊 Order Tracking System</li>
  <li>🖼️ Static Image Serving</li>
</ul>

---

## 🏗️ Tech Stack

<table align="center">
<tr>
<td><b>Frontend</b></td>
<td>React, Vite, Axios</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>Node.js, Express</td>
</tr>
<tr>
<td><b>Database</b></td>
<td>MongoDB</td>
</tr>
<tr>
<td><b>Others</b></td>
<td>Mongoose, dotenv, CORS</td>
</tr>
</table>

---

## 📂 Project Structure

```text
Farmer-Buyer-Direct-Marketplace-Portal-website/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend-vite/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── pages/
│   ├── public/
│   └── package.json
│
├── picture/
├── SAMPLE_DATA.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```
---

### 🎨 Frontend Setup

```bash
cd frontend-vite
npm install
npm run dev
```

---

## 🌐 Local URLs

| Service    | URL                              |
| ---------- | -------------------------------- |
| Backend    | http://localhost:5000            |
| Frontend   | http://localhost:5173            |
| API Health | http://localhost:5000/api/health |

---

## 🧪 Demo Credentials

<div align="center">

| Role      | Email                                     | Password  |
| --------- | ----------------------------------------- | --------- |
| 🚜 Farmer | [rajesh@farm.com](mailto:rajesh@farm.com) | farmer123 |
| 🛒 Buyer  | [amit@buyer.com](mailto:amit@buyer.com)   | buyer123  |

</div>

---

## 🔌 API Endpoints

<details>
<summary>Click to Expand</summary>

### 👤 Users

* POST /users/register
* POST /users/login
* GET /users
* GET /users/:id

### 📦 Products

* GET /products
* GET /products/:id
* POST /products
* PUT /products/:id
* DELETE /products/:id
* GET /products/farmer/:farmerId

### 🛒 Orders

* GET /orders
* GET /orders/:id
* GET /orders/buyer/:buyerId
* GET /orders/farmer
* POST /orders
* PUT /orders/:id/status
* DELETE /orders/:id

</details>

---

## 🔐 Authentication

Currently uses header-based authentication:

```
user-id: <mongodb_user_id>
user-role: farmer | buyer
```

⚠️ For production, use JWT authentication and hashed passwords.

---

## 📊 Highlights

✔ Full-stack architecture

✔ REST API design

✔ Role-based system

✔ Real-world use case (Agri Marketplace)

---

## 🚀 Future Enhancements

* 🔒 JWT Authentication
  
* 💳 Payment Integration
  
* 📱 Mobile Responsiveness
  
* ☁️ Cloud Deployment
---
