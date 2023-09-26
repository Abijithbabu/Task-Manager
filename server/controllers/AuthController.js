const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, process.env.JWT_SECRET);
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPassword = await existingUser.matchPasswords(password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect password ! please recheck your password" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });
    console.log("token send", token);
    res.status(200).cookie("token", token, {
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
  } catch (error) {
    return new Error(error);
  }
};

const Register = async (req, res) => {
  try {
    const { name ,email, password } = req.body;
    console.log(email, password, process.env.JWT_SECRET);
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name , email,password})
    console.log(user);
    await user.save()
    console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 860000,
    });
    console.log("token send", token);
    return res.status(200).cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      SameSite: "None",
      secure: true,
    })
    .json({ message: "Successfully Logged in",user, token })

  } catch (error) {
    console.log(error.message)
    return new Error(error);
  }
};

module.exports = {
  login,
  Register
}