# Farmer-Buyer Direct Marketplace Portal

Full-stack marketplace web app that connects farmers and buyers directly.

## Overview

This project includes:

- Backend API with Node.js, Express, and MongoDB
- Frontend client with React + Vite
- Role-based flows for farmer and buyer users
- Product listing, search, filtering, cart, and order management
- Static product image serving from the `picture/` folder

## Tech Stack

- Frontend: React, React Router, Axios, Vite
- Backend: Node.js, Express, Mongoose, CORS, dotenv
- Database: MongoDB
## Repository Structure

```text
Farmer-Buyer-Direct-Marketplace-Portal-website/
|-- backend/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- db.js
|   |-- server.js
|   |-- package.json
|   `-- .env.example
|-- frontend-vite/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   `-- pages/
|   |-- public/
|   |-- package.json
|   `-- vite.config.js
|-- picture/
|-- SAMPLE_DATA.js
`-- README.md
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

## Environment Setup

Create `backend/.env` from `backend/.env.example`.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/farmer-buyer-marketplace
PORT=5000
NODE_ENV=development
```

Frontend API base URL is read from `VITE_API_URL` in `frontend-vite`.
If not set, it defaults to `http://localhost:5000/api`.

Optional `frontend-vite/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Install Dependencies

From repository root, run:

```bash
cd backend
npm install

cd ../frontend-vite
npm install
```

## Run the Application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend (new terminal):

```bash
cd frontend-vite
npm run dev
```

Default local URLs:

- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`
- Frontend: `http://localhost:5173`
- Images: `http://localhost:5000/images/<filename>`

## Seed Sample Data

Use the provided `SAMPLE_DATA.js` file in Mongo shell:

```bash
mongosh
use farmer-buyer-marketplace
load("SAMPLE_DATA.js")
```

This inserts:

- 4 users (2 farmers, 2 buyers)
- 8 products
- 3 orders

## Demo Credentials

Farmer:

- Email: `rajesh@farm.com`
- Password: `farmer123`

Buyer:

- Email: `amit@buyer.com`
- Password: `buyer123`

## NPM Scripts

Backend (`backend/package.json`):

- `npm start` - Run API server
- `npm run dev` - Run API with nodemon

Frontend (`frontend-vite/package.json`):

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Summary

Base URL: `http://localhost:5000/api`

User routes:

- `POST /users/register`
- `POST /users/login`
- `GET /users`
- `GET /users/:id`

Product routes:

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /products/farmer/:farmerId`

Order routes:

- `GET /orders`
- `GET /orders/:id`
- `GET /orders/buyer/:buyerId`
- `GET /orders/farmer`
- `POST /orders`
- `PUT /orders/:id/status`
- `DELETE /orders/:id`

## Authentication Model (Current)

Protected endpoints use request headers:

- `user-id: <mongodb_user_id>`
- `user-role: farmer|buyer`

Note: This is suitable for learning/demo usage. For production, replace with secure token-based auth (for example JWT) and hashed passwords.

## Current Feature Set

- User registration and login
- Farmer product CRUD
- Buyer browsing, product detail, and cart flow
- Buyer order placement and cancellation
- Farmer order status updates
- Product category filter and search
- Static image display for sample products

## License

MIT
