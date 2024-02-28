# BlogPinnacle

BlogPinnacle is a full-stack blogging website built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, login, create, update, and delete their own blogs. The website implements JWT authentication for secure user authentication and password encryption for enhanced security.

## Screenshots
![Home](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/f7bc7b68-9774-4c6e-b727-8cfca35cf98e)
![Register](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/ab01f3d1-0a2e-4f2c-8c41-10c782083d26)
![Login](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/90b1866f-fa32-466c-81db-416fb7b730f5)
![User](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/d56af12e-0194-4362-bd9f-03a25798722f)
![My blogs](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/2c728ab2-0350-4e0d-9444-0a0c79eb3567)
![All blogs](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/550065ce-a2cb-4f55-b6f9-c54f36602a6f)


## Features

- **User Registration:** Users can create an account by providing necessary details.
- **User Authentication:** JWT authentication is implemented to ensure secure user login.
- **Password Encryption:** User passwords are encrypted before storing them in the database.
- **Blog Creation:** Logged-in users can create their own blogs.
- **Blog Management:** Users can update and delete their own blogs.
- **Error Handling:** Errors are gracefully handled using try-catch blocks with appropriate response messages.
- **Read-only Blogs:** Blogs are visible to all users, but editing and deleting capabilities are restricted to the author.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data and blogs.
- **Express.js:** Backend framework for handling server logic and API routes.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **JWT (JSON Web Tokens):** Used for secure authentication.
- **bcrypt.js:** Library for hashing and encrypting passwords.

## Installation

1. **Clone the repository:**
git clone [[https://github.com/shubhrocks20/blogpinnacle](https://github.com/shubhrocks20/blogpinnacle)]

2. **Navigate to the project directory:**

cd blogpinnacle

3. **Install dependencies:**

npm install


4. **Set up environment variables:**

Create a `.env` file in the root directory and add the following variables:

MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your secret key for JWT>


5. **Start the server:**

npm run dev


6. **Navigate to `http://localhost:3000` in your browser to access the application.**

## Usage

1. Register an account on the website.
2. Log in using your credentials.
3. Create, update, or delete your own blogs from the dashboard.
4. View blogs from other users in read-only mode.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 

## Contact

If you have any questions or suggestions, feel free to contact us at [shubhamkumar2056@gmail.com].





