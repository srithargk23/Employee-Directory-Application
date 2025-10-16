# Employee Directory Application

## Overview
This is a **full-stack Employee Directory Application** built with **Next.js**, **Apollo GraphQL**, and **MongoDB**.  
It allows users to **view, add, update, and delete employees** while supporting **mobile-responsive layouts** and department-based filtering.

---

## Features
- **Backend**
  - Node.js + Apollo Server 4
  - MongoDB (native driver, no Mongoose)
  - GraphQL queries & mutations:
    - `getAllEmployees`
    - `getEmployeeDetails(id)`
    - `getEmployeesByDepartment(department)`
    - `addEmployee`
    - `updateEmployee`
    - `deleteEmployee`
- **Frontend**
  - Next.js App Router
  - Apollo Client with caching
  - Employee table (grid on desktop, card view on mobile)
  - Add/Edit Employee forms with validation
  - Department filter dropdown
  - Mobile-responsive UI using Tailwind CSS
- **UX Enhancements**
  - Toast notifications for Add, Update, Delete actions
  - Theme-consistent buttons and table colors
  - Interactive forms with validation

---

## Screenshots

**Home Page (Desktop)**  
![Desktop Screenshot](./screenshots/home-desktop.png)

**Home Page (Mobile)**  
![Mobile Screenshot](./screenshots/home-mobile.png)

**Add/Edit Employee Form**  
![Form Screenshot](./screenshots/form.png)

---

## Getting Started

### Prerequisites
- Node.js >= 20.x
- MongoDB installed and running
- npm / yarn
- Optional: Git

### Backend Setup
1. Navigate to the backend folder:
```bash
cd backend
