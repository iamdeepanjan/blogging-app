# Blogging Application (BlogNest) - A Modern Blogging Platform

## Overview
This is a full-stack blogging application built using **Angular** and **Spring Boot**. The application allows users to **register, log in, create blogs, like blogs, and view other users' blogs**. Authentication is managed using **JWT tokens**, and the UI is developed using **Angular Material** for a modern look and feel. BlogNest is a feature-rich blogging platform. BlogNest provides a seamless and engaging experience for both writers and readers.

## Features
### **User Authentication**
- User registration and login with JWT authentication
- Password update functionality

### **Blog Management**
- Create, edit, and delete blogs
- View all blogs from different users
- View only the blogs created by the logged-in user

### **Comment System**
- Engage with content by commenting on blog posts.
- You can delete your blog's comments.

### **User Engagement**
- Like and unlike blogs
- View the number of likes on each blog

### **Security**
- JWT authentication for secure access
- Role-based access control (Admin/User)

### **Morder UI**
- Designed with Angular Material for an intuitive and user-friendly experience.
- Efficiently browse blog posts using pagination features.

## Tech Stack
### **Frontend:**
- Angular
- Angular Material
- TypeScript
- HTML/CSS

### **Backend:**
- Spring Boot (Java)
- Spring Security (JWT Authentication)
- MySQL Database (Database)
- JPA/Hibernate (ORM)

## Installation and Setup
### **1. Backend Setup (Spring Boot)**
#### **Prerequisites:**
- Java 17+
- Maven
- MySQL Database

#### **Steps to Run the Backend**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/blogging-app.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd blogging-app/backend
   ```
3. Configure database settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/blog_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Run the backend using Maven:
   ```sh
   mvn spring-boot:run
   ```

### **2. Frontend Setup (Angular)**
#### **Prerequisites:**
- Node.js (LTS version recommended)
- Angular CLI

#### **Steps to Run the Frontend**
1. Navigate to the frontend folder:
   ```sh
   cd blogging-app/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular development server:
   ```sh
   ng serve
   ```
4. Open the application in your browser:
   ```
   http://localhost:4200/
   ```

## API Endpoints
### **Authentication APIs**
| Method | Endpoint          | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | User login          |

### **Blog APIs**
| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/blogs`         | Get all blogs                      |
| GET    | `/blogs/{id}`    | Get a specific blog by ID          |
| POST   | `/myblogs`       | Create a new blog                  |
| PUT    | `/blogs/{id}`    | Update a blog                      |
| DELETE | `/blogs/{id}`    | Delete a blog                      |
| POST   | `/likes/{blogid}`| Like a blog                        |

## Future Enhancements
- **Category Tags:** Filter blogs based on categories.
- **Email Notifications:** Notify users about new likes and comments.

## Contributing
Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
### **Developed By:**
Deepanjan Datta  🚀

