const User = require("../model/user.model");

const createUser = async (req, res) => {
  try {
    const { userName, mobileNumber, course } = req.body;

    if (!userName || !mobileNumber) {
      return res
        .status(401)
        .json({ massage: "Must fill username and password" });
    }
    const existUser = await User.findOne({ userName });
    if (existUser) {
      return res.status(401).json({ massage: "User Already Exist" });
    }
    const newUser = new User({
      userName,
      mobileNumber,
      course,
    });
    const saveUser = await newUser();
    return res.status(201).json({ massage: "Sent massage successfully" });
  } catch (error) {
    return res.status(500).json({ massage: "Something Wrong" + error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      return res.status(404).json({ massage: "No user available" });
    }
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json({ massage: "Something Wrong" + error });
  }
};

module.exports = createUser;
