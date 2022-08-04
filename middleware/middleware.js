const jwt = require("jsonwebtoken");
const db = require("../config/db");
class middleware {
  static checkAuth(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization;
    let verifyToken = null;
    if (token) {
      verifyToken = jwt.verify(token, process.env.KEY);
      if (verifyToken) {
        next();
      }
    }
    req.user = verifyToken;
  }
}

module.exports = middleware;
