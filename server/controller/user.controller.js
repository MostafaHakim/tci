const User = require("../model/user.model");

const createUser = async (req, res) => {
  try {
    const { userName, mobileNumber, course, userComments } = req.body;

    if (!userName || !mobileNumber) {
      return res
        .status(401)
        .json({ message: "Must fill username and password" });
    }

    const newUser = new User({
      userName,
      mobileNumber,
      course,
    });
    const saveUser = await newUser.save();
    return res.status(201).json({ message: "Sent massage successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something Wrong" + error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      return res.status(404).json({ message: "No user available" });
    }
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json({ message: "Something Wrong" + error });
  }
};

module.exports = { createUser, getAllUser };
