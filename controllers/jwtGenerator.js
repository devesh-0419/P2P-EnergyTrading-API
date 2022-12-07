const jwt = require('jsonwebtoken');
const expire = 60*60;
module.exports.createToken = (user) => {
  const data= {
    email:user.email,
    verifiedMail:user.verifiedMail,
    isNode:user.isNode
};
    console.log('id', data);
      return jwt.sign(data,process.env.TOKEN_SECRET,{expiresIn:expire});
};

