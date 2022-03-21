const jwt=require('jsonwebtoken');

const isAuth=(req,res,next)=>{
    const aheader=req.headers['authorization'];
    console.log(aheader);
    const token=aheader && aheader.split(' ')[1];
    console.log(token +"helleofoi");
    console.log(token=== "undefined");
    if(token=="undefined"){
        // // return res.status(404).send('helo');
        // console.log("verification failed");
        // return;
        console.log("this is if condition");
        next();
        // return;
    }
    else{
        jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
            console.log("this is breaking if condition");
            if(err) {
                
                return res.status(403).send("you are not authorized")
            }
            req.user=user;
            next();
        })
    }
}
module.exports=isAuth;