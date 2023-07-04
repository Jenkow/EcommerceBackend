import jwt from 'jsonwebtoken'

export default (req,res,next) => {
    req.token = jwt.sign(
        { email:req.body.email },
        process.env.SECRET_JWT,
        { expiresIn:60*60*24 }
    )
    return next()
}
