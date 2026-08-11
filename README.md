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
