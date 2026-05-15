# NOT-TEMU

## Overview

NOT-TEMU is a smart e-commerce system developed as a university group project. This system focuses on handling product catalogs, user authentication, order management, and payment simulation using a structured backend architecture.

Our project demonstrates a full-stack web application using React, Spring Boot, PostgreSQL, and cloud deployment services.

---

# Technologies Used

| Component       | Technology                |
| --------------- | ------------------------- |
| Frontend        | React + TypeScript + Vite |
| Backend         | Spring Boot               |
| Database        | PostgreSQL                |
| ORM             | Hibernate / JPA           |
| Cloud Database  | Supabase                  |
| Deployment      | Render                    |
| Version Control | GitHub                    |

---

# Features

Feature                    | Status                
-------------------------- | ---------------------
User Registration          | Completed
User Login                 | Completed
Product Catalog            | Completed
Product CRUD               | Completed
Order Checkout             | Completed
Payment Simulation         | Completed
Cloud Database Integration | Completed
Backend Deployment         | Completed
Frontend UI                | Completed
Real Payment Gateway       | Not Implemented yet

---

# Project Structure

```txt
NOT-TEMU/
backend/
  controller/
  service/
  repository/
  model/
  dto/
  config/

frontend/
  src/
  public/

README.md
```

---

# Backend Setup

## 1. Navigate to Backend Folder

---

## 2. Configure Environment Variables

```powershell
$env:DB_URL="jdbc:postgresql://aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require"

$env:DB_USER="postgres.sjncjckslkkfqlyyxhpt"

$env:DB_PASSWORD="Averystrongpassword@"
```

---

## 3. Start Backend

```powershell
.\mvnw spring-boot:run
```

Backend runs on:

```txt
http://localhost:8081
```

---

# Frontend Setup

## 1. Navigate to Frontend Folder
depends on your directory but usually it will be at the ```frontend ``` folder

---

## 2. Install Dependencies

```powershell
npm install
```

---

## 3. Run Frontend

```powershell
npm run dev
```

Frontend usually runs on:

```txt
http://localhost:5173
```

---

# Deployment

| Service          | Provider |
| ---------------- | -------- |
| Backend Hosting  | Render   |
| Database Hosting | Supabase |

Production Backend URL:

```txt
https://not-temu.onrender.com
```

---

# API Endpoints

## Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |

---

## Products

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/products`      | Get all products  |
| GET    | `/products/{id}` | Get product by ID |
| POST   | `/products`      | Create product    |
| PUT    | `/products/{id}` | Update product    |
| DELETE | `/products/{id}` | Delete product    |

---

## Orders

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | `/orders/checkout` | Create order |

---

## Payments

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| POST   | `/payments/pay` | Simulate payment |

---

# Validation & Error Handling

Feature                      | Status
---------------------------- | ------
Duplicate email prevention   | Completed
Invalid login handling       | Completed
Empty field validation       | Completed
Product existence validation | Completed
Stock validation             | Completed
Global exception handling    | Completed

---

# Team Workflow

Tool            | Purpose
--------------- | ------------------
GitHub          | Version control
Discord         | Team communication
Bruno / Postman | API testing
VS Code         | Development
Render          | Backend deployment
Supabase        | Database hosting

---

# Contributors
Name             | Contribution
---------------- | -----------------------------------
Do Nhat Anh Khoa | Backend development, deployment
Huu Anh Tran     | Frontend development, coordinator
Zirou Guo        | Project collaboration and planning

Scrum leaders are rotated, with the scrum leaders in order:
Huu Anh, Zirou, Khoa, Huu Anh
---

# Notes

* Payment processing is currently simulated and does not use a real payment gateway.
* The project currently uses a shared Supabase PostgreSQL database.
* Environment variables should not be committed to GitHub.
* Global exception handling and validation are implemented in the backend.

---

# Production Deployment

Backend URL:

```txt
https://not-temu.onrender.com
```

Example API:

```txt
https://not-temu.onrender.com/products
```
