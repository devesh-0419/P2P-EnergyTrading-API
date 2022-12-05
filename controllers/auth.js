const jwt = require('jsonwebtoken');
const expire = 60*60;
module.exports.createToken = (id) => {
    console.log('id', id);
      return jwt.sign(id,process.env.TOKEN_SECRET,{expiresIn:expire});
};

