# VRV Security’s Backend Developer Intern Assignment

This project implements a **Node.js** application with **authentication** and **role-based access control (RBAC)** using **JWT**. It includes features for user signup, login, and access restriction based on roles like `Admin`, `User`, and `Moderator`.

---

## Features

- **Authentication**:
  - Signup with email and password (hashed using bcrypt).
  - Login with JWT token generation.
- **Authorization**:
  - Role-based access control for `Admin`, `User`, and `Moderator`.
  - Token validation and restricted access to protected routes.
- **Secure Password Handling**:
  - Strong password validation with requirements for uppercase, lowercase, digit, and special character.
  - Hashed passwords stored in the database.
- **Token Expiration**:
  - JWT tokens expire after 1 hour for added security.

---

## Prerequisites

- **Node.js** installed on your system.
- **MongoDB** connection string for the database.

---

## Getting Started

Follow these steps to set up and run the project:

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd <repository_name>
```

### Step 2: Add Environment Variables
Create a .env file in the root directory and add the following environment variables

```bash
PORT=8080
MONGO_URI=<your_mongodb_connection_string>
TOKEN_SECRET=<your_secret_key>
```

### Step 3: Install Dependencies
Navigate to the server folder and run:
```bash
npm install
```

### Step 4: Run the Application
Development Mode:
```bash
npm run dev
```
Production Mode:
```bash
npm start
```

### API Documentation
Access the detailed API documentation via Postman at the following link: 
https://documenter.getpostman.com/view/27080842/2sAYBViXdp
