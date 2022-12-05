const jwt = require('jsonwebtoken');
const expire = 60*60;
module.exports.createToken = (id) => {
      return jwt.sign({id},process.env.TOKENSECRET,{expiresIn:expire});
};

