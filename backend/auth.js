import bcrypt from "bcrypt";
import jwt from "jwt";

const JWT_SECRET = "secret_key";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token) return res.status(401).json({ error: "an authorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "forbidden" });
    req.user = user;
    next();
  });
};
