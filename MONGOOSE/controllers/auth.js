const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const catchAsync = require("./../utils/asyncWrapper");
const AppError = require("./../utils/appError");
const asyncWrapper = require("./../utils/asyncWrapper");

// Function for assigning token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//  <--- SIGNUP FUNCTION --->

signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  //  <-- Login User just after signingup! -->

  const token = signToken(newUser._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

//  <--- LOGIN FUNCTION --->

login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password eixist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // Check if user exists && password is correct

  const user = await User.findOne({ email }).select("password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // If everything ok, send token to client
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
});

logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });

  res.status(200).json({ status: "success" });
};

// <------- PROTECTING ROUTES MIDDLEWARES ------->

//  <--- SINGUP CHECK --->

protect = catchAsync(async (req, res, next) => {
  //  Get the token and check is it there and is USER LOGGEDIN!
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.cookies.jwt == "loggedout") {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

module.exports = {
  signup,
  login,
  logout,
  protect,

  restrictTo,
};
