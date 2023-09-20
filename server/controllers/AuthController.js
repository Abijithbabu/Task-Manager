const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, process.env.JWT_SECRET);
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email }).populate('bookmarks')
    } catch (error) {
      return new Error(error);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPassword = await existingUser.matchPasswords(password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password ! please recheck your password" });
    }
    if (existingUser.isDelete) {
      return res.status(400).json({
        message: "oops ! you've been temporarly blocked by the Administrator",
      });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });
    console.log("token send", token);
  
    res
      .status(200)
      .cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        SameSite: "None",
        secure: true,
      })
      .json({
        message: "Successfully Logged in",
        user: existingUser,
        token,
      });
  };

  module.exports = {
    login
  }