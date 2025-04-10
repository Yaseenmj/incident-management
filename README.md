# Incident Management System

This project is a simple Incident Management System designed to demonstrate backend skills including user authentication, CRUD operations, file uploads, role-based access, and filtering/searching capabilities.

## 📌 Features

- User Authentication with JWT
- Role-based Access (Admin & User)
- Incident CRUD with Image Uploads
- Search, Filter, and Pagination
- File upload validation (.jpg, max 5MB)

## 🧑‍💻 User Roles

- **Admin**: View and manage all incidents.
- **User**: Create, view, edit, and delete their own incidents.

## 🗃️ Incident Fields

- **Title**: Short description of the issue
- **Description**: Detailed explanation
- **Category**: Hardware, Software, Network, etc.
- **Status**: Open, In Progress, Resolved, Closed
- **Priority**: Low, Medium, High, Critical
- **Images**: Uploaded image URLs (stored in local filesystem)
- **Created By**: User ID
- **Timestamps**: Created At / Updated At

## 🖼️ Image Upload

- Allowed Format: `.jpg` only
- Max Size: 5MB per image
- Storage: Local (`/uploads` folder)
- Stored in DB as URL references

## 🔎 Search & Filter Options

- **Title** (partial match)
- **Category**
- **Status**
- **Priority** (sorted with Critical first)
- **Date Range**
- **Pagination** (page & limit)

## ⚙️ Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based
- **File Uploads**: Multer (local storage)

## 🚀 Getting Started

### 1. Clone the Repository

``` 
git clone https://github.com/your-username/incident-management-system.git
cd incident-management-system
2. Install Dependencies
 
 

 
npm install
3. Setup Environment Variables
Create a .env file in the root directory:

 
 

 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the Server
 
 

 
npm start
The server will run at http://localhost:5000.

🔐 API Authentication
Use /api/auth/register and /api/auth/login to register/login and obtain a token.

Include the JWT in headers for protected routes:

makefile
 

 
Authorization: Bearer <your-token>
📁 API Endpoints
🔐 Auth
POST /api/auth/register

POST /api/auth/login

📝 Incidents
POST /api/incidents (with images)

GET /api/incidents (admin only)

GET /api/incidents/user

PUT /api/incidents/:id

DELETE /api/incidents/:id

GET /api/incidents/search?title=&category=&status=&priority=&startDate=&endDate=&page=1&limit=10

📸 Uploads
Access uploaded images via:

 
 

 
http://localhost:5000/uploads/<image_name>
📦 Git Strategy
Main branch: main

Feature branches: feature/<name>

🧾 License
This project is for evaluation purposes only.

✅ Project  completed by Mohammed Yaseen MJ """