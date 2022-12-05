const jwt = require("jsonwebtoken");

const decodedToken = (token) => {
  try {
    const decodedtoken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedtoken;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
const verifiedMail = (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedtoken = decodedToken(token);
  if (decodedtoken) {
    if (decodedtoken.verifiedMail) {
      next();
    } else {
      return res.status("400").json({ message: "very your mail" });
    }
  } else {
    return res.status("400").json({ message: "Bad request.." });
  }
};
const Auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedtoken = decodedToken(token);
  console.log("decodedtoken", decodedtoken);
  if (decodedtoken) {
    next();
  } else {
    return res.status("401").json({ message: "Unauthorised..." });
  }
};


module.exports = { verifiedMail, Auth };
