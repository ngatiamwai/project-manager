const joi=require('joi')

const userLoginValidator=joi.object({
    userName:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20'
    }),
    userPassword:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

const userRegisterValidator=joi.object({
    userName:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20'
    }),
    userEmail:joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    userPassword:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>?/~`]{8,}$'))
})


module.exports={
userLoginValidator,
userRegisterValidator
    
}