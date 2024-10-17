# Primebazar: Full-Stack E-Commerce Website

Prime Bazaar is a full-stack e-commerce website designed to provide a seamless shopping experience for customers while offering administrative capabilities to manage products, orders. The application is built using advanced technologies, ensuring both performance and scalability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
  - [Admin Panel](#admin-panel)
- [License](#license)
- [Contact](#contact)

## Features

### User Features

- User registration and authentication
- Product browsing and searching
- Shopping cart functionality
- Order placement and tracking

### Admin Features

- Product management (add, delete products)
- Order management (view, update order status)

## Technologies Used

- **Front-End:**

  - React.js
  - Context API (for state management)
  - Tailwind CSS (for styling)

- **Back-End:**

  - Node.js
  - Express.js
  - MongoDB (for the database)
  - Mongoose (for MongoDB object modeling)
  - JWT (for authentication)

- **Tools:**
  - Git (version control)
  - Postman (for API testing)

## Architecture

```
Primebazar
├── frontend/                # Front-End Code
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Context Api Component
│   │   ├── App.js           # Main application component
│   │   └── PrivateRoute.js  # Main application component
│   └── package.json         # Front-end dependencies
│
├── admin/                   # Admin Code
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── context/         # Context Api Component
│   │   └── App.js           # Main application component
│   └── package.json         # Front-end dependencies
│
├── backend/                 # Back-End Code
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   └── server.js            # Main server file
│
├
```

## Installation

To get started with Primebazar, follow the steps below:

### Prerequisites

- Node.js
- MongoDB
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/codebyfaisal/primebazar.git
   cd primebazar
   ```

2. **Set up the Back-End:**

   ```bash
   cd server
   npm install
   ```

   - Create a `.env` file in the `server` directory and set your environment variables (for example `env.example`)

3. **Set up the Front-End:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the application:**

   - **Back-End:**
     ```bash
     cd server
     npm start
     ```
   - **Front-End:**
     ```bash
     cd ../frontend
     npm run dev
     ```

5. Access the application at `http://localhost:5173`.

## Usage

### Front-End

- Access the frontend at `http://localhost:5173`.
- Users can register, log in, browse products, and place orders.
- The front-end is responsive and designed to work on both desktop and mobile devices.

### Back-End

- Access the server at `http://localhost:5000`.
- The server exposes RESTful APIs for product management, order processing, and user authentication.
- Use tools like Postman to test the APIs.

### Admin Panel

- Access the admin panel at `http://localhost:5174`.
- Admin credentials can be created from the database directly for testing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- **Your Name**  
  [codebyfaisal@gmail.com](mailto:codebyfaisal@gmail.com)  
  [GitHub Profile](https://github.com/codebyfaisal)
