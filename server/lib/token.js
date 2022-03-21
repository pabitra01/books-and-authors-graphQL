const {sign} =require('jsonwebtoken');
// const createAccessToken= userID=>{
//     return sign({userID},process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn:'15m'
//     })
// }
const createToken=userID=>{
    return sign({userID},process.env.TOKEN_SECRET,{
        expiresIn:'60s'
    })
}
// const sendAccessToken=(res,req,accessToken)=>{
//     res.send({
//         accessToken,
//         email:req.body.email
//     })
// }
// const sendRefreshToken=(res,refreshToken)=>{
//     res.cookie('refreshtoken',refreshToken,{
//         httpOnly:true,
//         path:'/books'
//     })
// }
module.exports={
    // createAccessToken,
    createToken
    // sendAccessToken,
    // sendRefreshToken
}
