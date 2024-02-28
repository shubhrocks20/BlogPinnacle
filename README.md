BlogPinnacle
BlogPinnacle is a full-stack blogging website built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, login, create, update, and delete their own blogs. The website implements JWT authentication for secure user authentication and password encryption for enhanced security.

Features
User Registration: Users can create an account by providing necessary details.
User Authentication: JWT authentication is implemented to ensure secure user login.
Password Encryption: User passwords are encrypted before storing them in the database.
Blog Creation: Logged-in users can create their own blogs.
Blog Management: Users can update and delete their own blogs.
Error Handling: Errors are gracefully handled using try-catch blocks with appropriate response messages.
Read-only Blogs: Blogs are visible to all users, but editing and deleting capabilities are restricted to the author.
Technologies Used
MongoDB: NoSQL database for storing user data and blogs.
Express.js: Backend framework for handling server logic and API routes.
React.js: Frontend library for building user interfaces.
Node.js: JavaScript runtime environment for executing server-side code.
JWT (JSON Web Tokens): Used for secure authentication.
bcrypt.js: Library for hashing and encrypting passwords.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/blogpinnacle.git
Navigate to the project directory:

bash
Copy code
cd blogpinnacle
Install dependencies:

Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

makefile
Copy code
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your secret key for JWT>
Start the server:

sql
Copy code
npm start
Navigate to http://localhost:3000 in your browser to access the application.

Usage
Register an account on the website.
Log in using your credentials.
Create, update, or delete your own blogs from the dashboard.
View blogs from other users in read-only mode.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Special thanks to [Name], [Name], and [Name] for their contributions and support during the development of this project.

Contact
If you have any questions or suggestions, feel free to contact us at [email@example.com].
