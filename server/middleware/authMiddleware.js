import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader ? "Received" : "Missing");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED USER ID:", decoded.id);

        const user = await User.findById(decoded.id).select("-password");

        console.log("USER FOUND:", !!user);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: error.message,
        });
    }
};

export default protect;