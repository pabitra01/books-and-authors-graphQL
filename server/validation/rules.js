const Joi=require('joi');
const signInRules=Joi.object({
    email:Joi.string().required().email({tlds: { allow: [ 'net'] }}),
    password:Joi.number().required()
})
module.exports=signInRules;