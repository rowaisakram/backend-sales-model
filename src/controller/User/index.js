import { compare, hash } from "bcrypt";
import userModel from "../../model/User/index.js";
import jwt from "jsonwebtoken";
import TokenModel from "../../model/Token/index.js";
import sendEmail from "../../utilities/email/index.js";

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
      const id = parseInt(req.params.id);
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
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
        role: payload.role,
      });
      const data = {
        id: newUser.id,
        email: payload.email,
        role: payload.role,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });
      await TokenModel.create({
        token,
      });
      const message = `${process.env.BASE_URL}/user/verify/${newUser.id}/${token}`;
      await sendEmail(payload.email, "Verify Email", message);
      res.status(201).json({ message: "An Email was Send!" });
    } catch (error) {
      console.log(error);
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
      if (user.verified === false) {
        return res.status(401).json({
          message: "Email not verified",
        });
      }
      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });
      await TokenModel.create({
        token,
      });
      res.status(200).json({ message: "Login Successfully", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!!" });
    }
  },
  delete: async (req, res) => {
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
      await user.destroy();
      res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!!" });
    }
  },
  update: async (req, res) => {
    try {
      const payload = req.body;
      const data = res.locals.user;
      const user = await userModel.findOne({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Invalid Credentials!",
        });
      }
      const comaprePassword = await compare(payload.oldPassword, user.password);
      if (!comaprePassword) {
        return res.status(401).json({
          message: "Invalid Credentials!",
        });
      }
      const hpassowrd = await hash(payload.newPassword, 10);
      user.password = hpassowrd;
      await user.save();
      res.status(200).json({ message: "User Password Updated Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!!" });
    }
  },
};
export default userController;
