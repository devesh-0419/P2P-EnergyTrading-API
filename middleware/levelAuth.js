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
      req.user=decodedtoken.email;
      next();
    } else {
      return res.status(400).json({ isError:true ,message: "verify your mail" });
    }
  } else {
    return res.status(400).json({ isError:true ,message: "Bad request.." });
  }
};
const Auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(123,token);
  const decodedtoken = decodedToken(token);
  console.log("decodedtoken", decodedtoken);
  if (decodedtoken) {
    req.user=decodedtoken.email;
    next();
  } else {
    return res.status(401).json({ isError:true, message: "Unauthorised..." });
  }
};

const verifiedNode = (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedtoken = decodedToken(token);
  if (decodedtoken) {
    if (decodedtoken.isNode) {
      req.user=decodedtoken.email;
      next();
    } else {
      return res.status(400).json({ isError:true,message: "add metaMask address..." });
    }
  } else {
    return res.status(400).json({ isError:true ,message: "Bad request.." });
  }
};
module.exports = { verifiedMail, Auth, verifiedNode };
