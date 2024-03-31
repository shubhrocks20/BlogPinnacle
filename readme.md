# BlogPinnacle 👨🏻‍💻

BlogPinnacle is a web application for creating and managing blog posts. It allows users to read and comment on blog posts, as well as like and unlike them. The application is built using React.js for the frontend and Node.js with Express.js for the backend.

## ScreenShots
- Home Page
  ![Screenshot 2024-03-31 185719](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/e6e25606-ed5f-499a-8995-ca550206daba)
- Login Page
  ![Screenshot 2024-03-31 185738](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/432d0895-f05c-48f3-8204-9dfffe54f4a0)
- Register Page
  ![Screenshot 2024-03-31 185756](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/8cc5abc3-5188-480c-bdcd-c93b6d5f3061)
- Blogs Page
  ![Screenshot 2024-03-31 185818](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/32c30f4a-e4a7-49f9-8ddb-40f7a6e7ff41)
- User Blog Page
  ![Screenshot 2024-03-31 185945](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/f299740a-5ee8-4b31-8191-cbace9565638)
- Post Creation
  ![Screenshot 2024-03-31 185932](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/266da535-56cd-4239-adc5-b14c539c467a)
- Single Blog View With Comments
  ![Screenshot 2024-03-31 190025](https://github.com/shubhrocks20/BlogPinnacle/assets/94545975/be680f67-d317-4263-9269-ca5f19dc5e56)

## Features 🌟

- 📚 View blog posts: Users can browse through a collection of blog posts, accessing content easily.
- 👍 Like and unlike blog posts: Users can express their appreciation for posts by liking them, which helps gauge popularity.
- 💬 Comment on blog posts: Users can engage in discussions by leaving comments on blog posts, fostering community interaction.
- 🗑️ Delete comments (for authenticated users): Authenticated users have the privilege to remove their own comments, providing control over their contributions.
- 📷 Image upload facility through Cloudinary: Users can seamlessly upload images for their blog posts via Cloudinary, enhancing visual content.
- 🔒 Password hashing using bcrypt: User passwords are securely hashed using bcrypt, ensuring confidentiality and protection against unauthorized access.
- 💡 State persistence using Redux: Redux enables state management across components, ensuring consistency and efficiency in data handling.
- ⏳ Loader component for indicating resource fetching: A loader component visually indicates when resources are being fetched, improving user experience by providing feedback on ongoing operations.

## Technologies Used 🛠️

### Frontend

- React.js
- Redux (for state management)
- React Router (for routing)
- Axios (for HTTP requests)
- React Icons (for iconography)
- React Toastify (for displaying toasts)
- Redux Persist (for persisting state)
- Loader component (for indicating resource fetching)

### Backend

- Node.js
- Express.js
- MongoDB (for database storage)
- Multer (for handling multipart/form-data for image uploads)
- Bcrypt (for hashing passwords)
- Cloudinary (for image storage and manipulation)

## Getting Started 🚀

To get started with BlogPinnacle, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shubhrocks20/BlogPinnacle.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd BlogPinnacle
   ```

3. **Install dependencies for both the frontend and backend:**

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

4. **Set up your MongoDB database:**

   - Configure the connection string in `server/config/db.js`.

5. **Set up a Cloudinary account:**

   - Configure the Cloudinary credentials in `server/config/cloudinary.js`.

6. **Run the backend server:**

   ```bash
   npm run dev
   ```

7. **Run the frontend application:**

   ```bash
   cd ../frontend && npm run dev
   ```

8. **Access the application:**

   Open your web browser and go to `http://localhost:5000`.

## Contributing 🤝

Contributions to BlogPinnacle are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This Markdown-formatted README file includes vibrant icons and formatting to enhance the appearance of the document. You can copy and paste this content directly into your README.md file.
