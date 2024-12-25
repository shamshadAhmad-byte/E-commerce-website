import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenFunction = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "password does not match" });
    }
    const token = tokenFunction(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({ name, email, password: hashedPassword });
    const token = tokenFunction(user._id);
    await user.save();
    res.json({ success: true, token });
    // res.end();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Server Error" });
  }
};

const admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = tokenFunction(email + password);
      res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentils",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { login, register, admin };
