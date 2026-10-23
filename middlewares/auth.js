const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if header exists and bearer
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access Denied. No token provided" });
  }

  // extract token string
  const token = authHeader.split(" ")[1];

  try {
    // verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded payload (userId, username) to req.user for downstream router
    req.user = decoded;
    next(); //next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
