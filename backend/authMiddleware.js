const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.protect = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  // Check if the Authorization header exists and extract the token
  const token = tokenHeader && tokenHeader.startsWith("Bearer ")
    ? tokenHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded payload (e.g., user ID) to the request object
    req.user = decoded.user || decoded; // Assure `user` is available in the payload

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any errors related to invalid token or expired token
    return res.status(401).json({
      message: error.message || "Invalid or expired token",
    });
  }
};
