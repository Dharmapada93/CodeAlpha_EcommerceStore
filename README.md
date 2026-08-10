# CodeAlpha E-commerce Store

## Overview
A fully-featured full-stack MERN e-commerce application developed as part of the CodeAlpha Full Stack Development Internship. This application implements a complete online shopping flow from registration and catalog discovery to cart management, secure checkout, order processing, and administrative inventory/order dashboards.

## Features
* **User Registration & Login**: Validated credential processing with password hashing (bcryptjs).
* **JWT Authentication**: Secure API endpoints guarded by bearer token verification.
* **Product Catalog**: Live listing of catalog inventory with client-side text searching, category filters, and sorting controls.
* **Product Details**: Product spec pages with real-time stock-bounded quantity selectors and Cart addition triggers.
* **Shopping Cart**: Fully functional context state synced with `localStorage` supporting item additions, adjustments, removals, and subtotal metrics.
* **Secure Checkout**: Shipping forms with client-side validators and stock check limits.
* **Order Processing**: Auto-reduces inventory stocks upon order submissions and logs entries into database collections.
* **Order History**: User dashboard tracking personal order histories, addresses, and process statuses.
* **Admin Dashboard**: Panel accessible to administrator accounts to manage catalog items (Create, Read, Update, Delete) and process incoming orders (Update status flags).
* **Responsive Styling**: Mobile-first premium layout adapting seamlessly across mobile, tablet, and desktop views.

---

## Tech Stack

### Frontend
* **React + Vite**: Responsive client framework.
* **React Router v6**: Single-page application routing.
* **Axios**: Network client with response interceptors for auto-logout handling on expired tokens.
* **Vanilla CSS**: Curated premium aesthetic styling system.

### Backend
* **Node.js & Express.js**: REST API server implementation.
* **MongoDB + Mongoose**: Database models and relationship bindings.
* **jsonwebtoken (JWT)**: Secure user session states.
* **bcryptjs**: Password encryption.

---

## Project Structure
```text
CodeAlpha_EcommerceStore/
├── backend/
│   ├── config/             # DB connection settings
│   ├── controllers/        # Handlers for auth, products, and orders
│   ├── middleware/         # JWT verify and Role check middlewares
│   ├── models/             # Mongoose schemas (User, Product, Order)
│   ├── routes/             # Express routing bindings
│   ├── createAdmin.js      # Script to seed default administrator account
│   ├── seeder.js           # Script to seed default catalog products
│   ├── .env.example        # Environment variables guide
│   └── server.js           # Server entrypoint
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable blocks (Navbar, Footer, ProductCard, ProtectedRoute)
│   │   ├── context/        # React context (AuthContext, CartContext)
│   │   ├── pages/          # Storefront and admin views
│   │   ├── services/       # Axios API client wrapper
│   │   ├── App.jsx         # App router mapping
│   │   ├── main.jsx        # App root setup
│   │   └── index.css       # Core layout styles
│   └── package.json
└── README.md
```

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd CodeAlpha_EcommerceStore
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory based on the `backend/.env.example` template:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
   JWT_SECRET=your_secret_key_here
   ```

3. **Install Backend Dependencies & Seed Database**:
   ```bash
   cd backend
   npm install
   
   # Seed default admin user (email: admin@codealpha.com, password: Admin@123456)
   node createAdmin.js
   
   # Seed default catalog products
   node seeder.js
   ```

4. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application

### Start Backend Server
From the `backend/` directory:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### Start Frontend Server
From the `frontend/` directory:
```bash
npm run dev
```
Vite will serve the app on `http://localhost:5173`. Open this URL in your web browser.

---

## API Endpoints

### Authentication
* `POST /api/auth/register` - Create user account
* `POST /api/auth/login` - Authenticate user & get token
* `GET /api/auth/profile` - Get logged-in user profile (Protected)

### Products
* `GET /api/products` - Retrieve all products
* `GET /api/products/:id` - Retrieve single product detail
* `POST /api/products` - Add new product (Admin Only)
* `PUT /api/products/:id` - Modify product catalog detail (Admin Only)
* `DELETE /api/products/:id` - Remove product from catalog (Admin Only)

### Orders
* `POST /api/orders` - Place a new order (Protected)
* `GET /api/orders/my-orders` - Retrieve personal order history (Protected)
* `GET /api/orders` - List all customer orders (Admin Only)
* `PUT /api/orders/:id/status` - Modify order shipping status (Admin Only)

---

## Internship
This project was developed for the **CodeAlpha Full Stack Development Internship** as part of **Task 1: E-commerce Store**.
