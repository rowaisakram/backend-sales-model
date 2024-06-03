import { compare, hash } from "bcrypt";
import userModel from "../../model/User/index.js";
import jwt from "jsonwebtoken";
const userController = {
  getAll: async (req, res) => {
    try {
      const users = await userModel.findAll();
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  },
  getSingle: async (req, res) => {
    try {
      const payload = req.body;
      const user = await userModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  },
  signUp: async (req, res) => {
    try {
      const payload = req.body;
      const user = await userModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        return res.status(400).json({
          message: "User already Exists",
        });
      }
      const hpassowrd = await hash(payload.password, 10);
      const newUser = await userModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hpassowrd,
      });
      res.status(201).json({ message: "User Created Successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!!" });
    }
  },
  signIn: async (req, res) => {
    try {
      const payload = req.body;
      const user = await userModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Invalid Credentials!",
        });
      }
      const comaprePassword = await compare(payload.password, user.password);
      if (!comaprePassword) {
        return res.status(401).json({
          message: "Invalid Credentials!",
        });
      }
      const data = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });
      //   await TokenModel.create({
      //     token,
      //   });
      res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!!" });
    }
  },
};
export default userController;
