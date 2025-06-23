# Roxiler-Systems---Full-Stack-Developer-Intern_Assignment
It is an full stack Assignment
// NOTE: This is a complete MERN-style full-stack scaffold using ExpressJS, PostgreSQL, and ReactJS for the Store Rating Platform challenge. 
// The backend and frontend folders are structured separately.

// Directory Structure:
// ├── backend
// │   ├── controllers
// │   ├── middleware
// │   ├── models
// │   ├── routes
// │   └── index.js
// └── frontend
//     ├── src
//     │   ├── components
//     │   ├── pages
//     │   ├── utils
//     │   └── App.js
A full-stack web application that allows users to rate stores with role-based access control for System Administrators, Normal Users, and Store Owners.

🛠 Tech Stack
Frontend: React.js, React Router, Axios, Tailwind CSS
Backend: Node.js, Express.js, JWT Auth, Sequelize ORM
Database: PostgreSQL

User Roles & Functionalities
System Administrator
Add new stores and users (Admin/Normal).
Dashboard:
Total users
Total stores
Total ratings

View users and stores with filters (Name, Email, Address, Role).
View full user/store details.

Logout.
Normal User
Register/Login

Search stores by name/address
Submit/Update ratings (1 to 5)
View personal rating and overall store rating

Logout
Store Owner
Login

Dashboard:
Users who rated their store
Average store rating
Logout
| Method | Endpoint                 | Role        | Description                |
| ------ | ------------------------ | ----------- | -------------------------- |
| POST   | /api/auth/login          | All         | Login                      |
| POST   | /api/auth/register       | Normal User | Signup                     |
| PUT    | /api/users/password      | All         | Update password            |
| GET    | /api/stores              | All         | List all stores            |
| POST   | /api/stores              | Admin       | Add a store                |
| GET    | /api/stores/\:id/ratings | Store Owner | View ratings of store      |
| POST   | /api/ratings             | Normal User | Submit/Update store rating |
| GET    | /api/dashboard/admin     | Admin       | Admin dashboard stats      |
| GET    | /api/dashboard/store     | Store Owner | Store dashboard stats      |

Database Schema
Users
id, name, email, password, address, role

Stores
id, name, email, address

Ratings
id, user_id, store_id, rating (1–5)

Features Implemented
->JWT-based Authentication
->Role-based Authorization
->Validated Forms (React + Backend)
->Filterable/Sortable Tables
-> Modular Code Structure
->Responsive UI
