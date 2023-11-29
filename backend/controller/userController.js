const { catchAsyncErr } = require("../middleWares/catchAsyncErr");
const User = require("../models/userModel");
const sendToken = require("../utills/jwtToken");
const ErrorHandler = require("../utills/errorHandler");

// Register User

exports.registerUser = catchAsyncErr(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const hashedPass = await bcrypt.hash(password,10);
  //   console.log(hashedPass);

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      publicId: "demoPublicId123",
      url: "Demourl.com",
    },
  });

  //   Get the token to login as soon as register

  sendToken(user, 201, res);

  // const token = user.generateJWTToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

// Login  User

exports.loginUser = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  // check is email and password exits or not
  if (!email || !password) {
    return next(new ErrorHandler(400, "Invalid email or password! 1"));
  }

  const user = await User.findOne({ email: email }).select("+password"); //note

  // if such user not found with the same mail id
  if (!user) {
    return next(new ErrorHandler(400, "Invalid email or password! 2"));
  }

  // if found then
  const isPasswordMatched = await user.comparePassword(password); //Await is must took 2 days to debug because this function give us a promise

  // if not matched
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Invalid email or password! 3 "));
  }

  //If matched
  sendToken(user, 200, res);

  // const token = user.generateJWTToken();

  // res.status(200).json({
  //   success: true,
  //   msg: "login succesfull",
  //   token,
  // });
});

// Log out user

exports.logoutUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !!",
  });
});

// Get all users

exports.getAllUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("User not availabe", 400));
  }
  res.status(200).json({
    success: true,
    users,
  });
});
