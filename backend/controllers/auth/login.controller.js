import { Record } from "../../models";

const loginController = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Record.findOne({ email: email }).select('-createdAt -updatedAt -__v');
      
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password!" });
      }
      //removing sensitive information such as email and password
      const sanitizedUser = { ...user.toObject() };
      delete sanitizedUser.password;
      delete sanitizedUser.email;

      return res.status(200).json({ message: "Login successful", user: sanitizedUser });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default loginController;
