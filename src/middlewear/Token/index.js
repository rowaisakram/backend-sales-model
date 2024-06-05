import tokenModel from "../../model/Token/index.js";
import userModel from "../../model/User/index.js";

const emailVerification = async (req, res) => {
  try {
    const user = await userModel.findOne({ id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");
    const token = await tokenModel.findOne({
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");
    user.verified = true;
    await user.save();
    await token.destroy();
    res.send("email verified sucessfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};

export default emailVerification;
