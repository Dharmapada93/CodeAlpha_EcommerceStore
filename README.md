# ShopSphere

A modern full-stack e-commerce web application designed to provide a simple, secure and seamless online shopping experience.

## Features

- User authentication
- Product browsing
- Product search
- Category filtering
- Product sorting
- Product details
- Shopping cart
- Quantity management
- Checkout
- Order history
- Responsive design
- REST API integration
- Database integration

## Tech Stack

Frontend:
- React.js
- JavaScript
- HTML
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

## Project Structure

```text
ShopSphere/
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
│   │   ├── components/     # Reusable UI blocks (Navbar, Footer, ProductCard, BenefitsSection, etc.)
│   │   ├── context/        # React context (AuthContext, CartContext)
│   │   ├── pages/          # Storefront pages and admin views (Home, ProductsPage, CartPage, etc.)
│   │   ├── services/       # Axios API client wrapper
│   │   ├── App.jsx         # App router mapping
│   │   ├── main.jsx        # App root setup
│   │   └── index.css       # Core layout styles
│   └── package.json
└── README.md
```

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <REPOSITORY_URL>
   cd ShopSphere
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory based on the `backend/.env.example` template:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/shopsphere
   JWT_SECRET=your_secret_key_here
   ```

3. **Install Backend Dependencies & Seed Database**:
   ```bash
   cd backend
   npm install
   
   # Seed default admin user (email: admin@shopsphere.com, password: Admin@123456)
   node createAdmin.js
   
   # Seed default catalog products
   node seeder.js
   ```

4. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

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
Vite will serve the app on `http://localhost:5173`.
