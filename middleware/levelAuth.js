const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{
   const token = req.cookies.jwt;
  console.log('token', token);
   if(token){
    jwt.verify(token,process.env.TOKEN_SECRET,(err,decodedtoken)=>{
        if(err){
            console.error('error: ',err.message);
           return res.status('401').send('Unauthorised User');
        } else{
            console.log('decodedtoken', decodedtoken); 
            next();
        }

        

    });
   }
}

module.exports={requireAuth};