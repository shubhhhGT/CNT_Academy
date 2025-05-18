const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = async (req, res, next) => {
  try {
    // Get token from req body or header or cookies
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    // If token is not found return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // If token is found, verify it
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// student
exports.isUser = async (req, res, next) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Users",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot be verified, please try again later",
    });
  }
};

// admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role cannot be verified, please try again later",
    });
  }
};
