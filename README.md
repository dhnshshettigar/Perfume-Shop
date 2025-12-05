# 🛍️ Perfume Shop — Full Stack MERN Application

A modern, responsive perfume e-commerce interface built using **React**, **Node.js**, **Express**, and **MongoDB**.
The project includes a polished homepage, dynamic product listing, product detail pages, responsive CTA hero section, and database-backed product content.

---

## 🚀 Features

### 🌐 Frontend (React + Tailwind CSS)

* Fully responsive **homepage**
* Full-width **hero banner (CTA)** with responsive image
* Clean **Navbar & Footer**
* Dynamic **product listing** loaded from backend
* Product cards with **hover animations**
* Product detail page with:

  * Description
  * Price + Sizes
  * Image gallery
  * Reviews section (read-only)
* Smooth layout and consistent styling

### 🗄️ Backend (Node.js + Express + MongoDB)

* REST API for products
* Reviews embedded inside product documents
* Seed script for initial product data
* Image-update script to replace placeholder URLs
* Clean folder structure (routes/models/data)

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Other:** Dotenv

---

## 📂 Project Structure

```
PerfumeShop/
│
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── data/
│   │   ├── seed.js
│   │   └── updateImages.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── images/
    │        ├── Hero-image-6.jpg
    │        ├── noir-velvet.jpg
    │        ├── azure-bloom.jpg
    │        ├── cedar-noir.jpg
    │        └── citrus-rush.jpg
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── ProductPage.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── shared/
    │   │   └── ProductCard.jsx
    │   ├── api.js
    │   └── App.jsx
    ├── package.json
    └── index.html
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd PerfumeShop
```

---

## ▶️ Backend Setup

### 2️⃣ Install dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create `.env` file

Inside `/backend`:

```
MONGO_URI=mongodb://127.0.0.1:27017/perfume-shop
PORT=5000
```

Or use your MongoDB Atlas URI.

### 4️⃣ Seed database

```bash
node data/seed.js
```

### 5️⃣ Update product images (optional)

```bash
node data/updateImages.js
```

### 6️⃣ Start backend server

```bash
npm run dev
```

Backend runs at:
➡️ [http://localhost:5000](http://localhost:5000)

---

## ▶️ Frontend Setup

### 7️⃣ Install dependencies

```bash
cd ../frontend
npm install
```

### 8️⃣ Start frontend

```bash
npm run dev
```

Frontend runs at:
➡️ [http://localhost:5173](http://localhost:5173)

---

## 🌟 API Endpoints

### **GET /api/products**

Returns all products.

### **GET /api/products/:id**

Returns single product.

### **POST /api/products/:id/reviews**

Adds a review to a product.

---

## 💡 Author

**Dhanush Shettigar**

---
