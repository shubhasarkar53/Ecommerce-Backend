const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give a username"],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Please give a email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Password should be greater than or equal to 8 charectures"],
    select: false,
  },
  avatar: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

// Encrypt functionality . We can implement it in userController but this would be more optimized

//  This function takes a next parameter, which is a function that should be called when the middleware is done. If an error occurs, you can pass the error to next, and Mongoose will stop the save operation and invoke the error handler.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// After register we let user to log in autometically so we need to use token here
// JWT token generation
userSchema.methods.generateJWTToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

// Compare Password function

userSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

module.exports = mongoose.model("User", userSchema);
