# Online Bookstore - MERN Stack

Welcome to the Online Bookstore project, a full-stack web application created using the MERN (MongoDB, Express, React, Node) stack. This application allows users to browse, search for, and purchase books. It is divided into both frontend and backend components.

## Backend Requirements

### 1. RESTful API
The backend implements a RESTful API to handle book-related operations, including:
- Creating, reading, updating, and deleting books.
- Retrieving a list of books.
- Searching for books by title, author, and description.

### 2. User Authentication and Authorization
User authentication and authorization are implemented using JSON Web Tokens (JWT). Key features include:
- User registration, login, and logout functionality.
- Only authenticated users can create, update, or delete books.

### 3. MongoDB Database
The application uses MongoDB as the database to store book information and user data.

### 4. Database Schema
A well-designed database schema supports the application's requirements.

### 5. Error Handling and Validation
The backend includes robust error handling and validation for API requests. Meaningful error messages are provided for various scenarios.

## Frontend Requirements

### 1. User-Friendly React Interface
The frontend is developed using React, providing a user-friendly web interface.

### 2. Responsive Design
The application features a responsive design that works seamlessly on both desktop and mobile devices.

### 3. Homepage Book List
The homepage displays a list of available books.

### 4. Browsing and Searching
Users can easily browse and search for books based on various criteria.

### 5. User Registration and Login
The frontend enables users to create accounts, log in, and log out.

### 6. Shopping Cart
Authenticated users can add books to their shopping cart.

### 7. Shopping Cart Features
The shopping cart allows users to add and remove books from their cart.

### 8. Book Details and Checkout
Users can view detailed information about a book, including title, author, price, and description. They can proceed to the checkout.

### 9. Checkout Process
A simple checkout process is implemented, which calculates the total price for the selected books.

## Technologies Used

- **Frontend**:
  - React + Vite
  - React Router for routing
  - Axios for API communication

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for data storage
  - JSON Web Tokens (JWT) for authentication
  - Mongoose for interacting with the database

## Getting Started

To get this project up and running on your local machine, follow these steps:

1. Clone this repository.
2. Navigate to the `frontend` and `backend` directories and follow the respective setup instructions.
3. Start both the frontend and backend servers.

Please refer to the README files in each directory for specific setup instructions.

Feel free to explore the project, and we hope you enjoy using this Online Bookstore! If you have any questions or feedback, please don't hesitate to get in touch.
