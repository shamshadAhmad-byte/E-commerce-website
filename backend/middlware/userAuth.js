import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.json({ success: false, message: "token is not authorized" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default userAuth;
