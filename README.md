# Backend Sales Model

This project is a Node.js and Express.js application designed to handle categories, products, sales, and user authentication/authorization.

## Features

- Category, Product, Sales Management
- User Authentication (Signup, Signin, Verification, Reset Password, Deletion)
- Role-based Access Control (Admin, Customer)
- Validation using Joi
- Secure password hashing with bcrypt
- Token-based authentication with JWT
- Email functionality with Nodemailer

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rowaisakram/backend-sales-model.git
2. Navigate to the project directory:
   ```sh
   cd backend-sales-model
3. Install the dependencies:
   ```sh
   npm install
4. Create a .env file in the root directory:
   ```sh
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_USERNAME=your_db_username
   DB_HOST=your_host
   JWT_SECRET_KEY=your_jwt_secret
   BASE_URL=your_base_url
   EMAIL_SERVICE =your_email_service
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   
## Usage

1. Start the server:
   ```sh
   npm start
2. Or for development:
   ```sh
   npm run dev
   
The server will be running at http://localhost:3000

## Contributing
Contributions are welcome! If you have any ideas for improvements or have found any bugs, feel free to open an issue or submit a pull request.
