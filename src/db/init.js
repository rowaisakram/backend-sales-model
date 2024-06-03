import userModel from "../model/User/index.js";

const syncDB = async () => {
  await userModel.sync({ alter: true, force: false });
};

export default syncDB;
