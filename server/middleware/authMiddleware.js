import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res,next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {
    try {
      token =
        req.headers.authorization.split(
          " "
        )[1];
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log("Decoded:", decoded);

const user = await User.findById(decoded.id);

console.log("User from DB:", user);

req.user = user?.select ? await User.findById(decoded.id).select("-password") : user;

if (!req.user) {
  return res.status(401).json({
    message: "User not found. Please login again.",
  });
}

next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "No token",
    });
  }
};

export default protect;