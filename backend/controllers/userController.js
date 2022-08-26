const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/error");

// ERROR OCCURED

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    // chceck for all inputs
    if (!name || !email || !password || !password2) {
      return next(handleError(400, "Please add all fields."));
    }

    if (password !== password2) {
      return next(handleError(400, "Password do not match."));
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return next(handleError(400, "User already exists."));
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      const registeredUser = {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      };
      res.status(201).json(registeredUser);
    } else {
      return next(handleError(400, "Invalid user data."));
    }
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error registering."));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const loggedUser = {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      };
      res.status(200).json(loggedUser);
    } else {
      return next(handleError(400, "Invalid email or password."));
    }
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error logging in."));
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
