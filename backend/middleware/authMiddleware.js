const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { handleError } = require("../utils/error");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      next(handleError(401, "Not authorized"));
    }
  }

  if (!token) {
    next(handleError(401, "Not authorized, no token"));
  }
};

module.exports = { protect };
