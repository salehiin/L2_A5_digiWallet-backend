

# DigiWallet Backend

## Project Overview
DigiWallet Backend is a Node.js and Express-based RESTful API server for a digital wallet system. It allows users to register, authenticate, manage wallets, send money, view transactions, and track commissions. The backend uses MongoDB with Mongoose for data storage and JWT for authentication.

---

## Features

- User registration and authentication (login, refresh token, logout)
- Password reset and update
- Wallet creation and retrieval
- Money transfer between wallets with commission deduction
- View all transactions (admin/super-admin)
- View personal transactions (users/agents)
- Commission tracking for transactions
- Role-based access control (admin, super_admin, user, agent)
- Secure JWT-based authentication and authorization

---

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Tools:** ts-node-dev, dotenv, http-status-codes

---

## API Endpoints

### User
| Endpoint                                     | Method | Description                            |
|----------------------------------------------|--------|----------------------------------------|
| `/api/v1/user/register`                      | POST   | Register a new user                    | 
| `/api/v1/user/all-users`                     | GET    | Retrieve all registered users          |
| `/api/v1/user/:userId`                       | PATCH  | Update user details by ID              |

### Auth
| Endpoint                                     | Method | Description                            |
|----------------------------------------------|--------|----------------------------------------|
| `/api/v1/auth/login`                         | POST   | User login                             |
| `/api/v1/auth/refresh-token`                 | POST   | Get new access token                   |
| `/api/v1/auth/logout`                        | POST   | Logout user                            |
| `/api/v1/auth/reset-password`                | POST   | Reset or change password               | (Problem)

### Transaction
| Endpoint                                     | Method | Description                            |
|----------------------------------------------|--------|----------------------------------------|
| `/api/v1/transaction/send`                   | POST   | Send money from one wallet to another  |
| `/api/v1/transaction`                        | GET    | Get all transactions (admin only)      |
| `/api/v1/transaction/my-transactions`        | GET    | Get transactions of the logged-in user |

### Wallet
| Endpoint                                     | Method | Description                            |
|----------------------------------------------|--------|----------------------------------------|
| `/api/v1/wallet`                             | POST   | Create a wallet for a user             |
| `/api/v1/wallet/:userId`                     | GET    | Get wallet details for a user          | (Problem)

### Commission
| Endpoint                                     | Method | Description                            |
|----------------------------------------------|--------|----------------------------------------|
| `/api/v1/commission`                         | GET    | View all commissions                   |

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)
- npm or yarn

https://github.com/salehiin/L2_A5_digiWallet-backend.git


pay0cent@gmail.com's Org
@S0000z#