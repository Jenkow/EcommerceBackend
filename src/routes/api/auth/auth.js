import { Router } from "express";
import User from "../../../models/user_model.js";
import validator from "../../../middlewares/validator.js";
import pass_is_8 from "../../../middlewares/pass_is_8.js";
import create_hash from "../../../middlewares/create_hash.js";
import is_valid_password from "../../../middlewares/is_valid_password.js";
import passport from "passport";
import token_generator from "../../../middlewares/token_generator.js";
import passport_call from "../../../middlewares/passport_call.js"

const auth_router = Router()

auth_router.post('/register',
    validator,
    pass_is_8,
    create_hash,
    passport.authenticate(
        'register',
        { failureRedirect: 'fail-register' }
    ),
    (req, res) => res.status(201).json({
        succes: true,
        message: 'user created'
    })
)

auth_router.get('/fail-register', (req, res) => res.status(400).json({
    success: false,
    message: 'error auth'
}))
//async (req, res, next) => {
//    try {
//        const { email, name, password, photo, age } = req.body
//        let user_data = {}
//        if (photo && age) { user_data = { email, name, password, photo, age } }
//        if (!photo && age) { user_data = { email, name, password, age } }
//        if (photo && !age) { user_data = { email, name, password, photo } }
//        await User.create(user_data)
//        return res.status(201).json({
//            succes: true,
//            message: 'user created'
//        })
//    } catch (error) {
//        next(error)
//    }
//})

auth_router.post('/signin',
    passport.authenticate('signin', { failureRedirect: 'fail-signin' }),
    is_valid_password,
    token_generator,
    (req, res, next) => {
        try {
           return res.status(200).cookie('token',req.token,{maxAge:60*60*1000}).json({
            success: true,
            message: 'User signed in',
           })
        } catch (error) {
            next(error)
        }
    }
)
auth_router.get('/fail-signin', (req, res) => res.status(400).json({
    success: false,
    message: 'error auth'
}))
//async (req, res, next) => {
//    try {
//        const { email, password } = req.body
//        const one = await User.findOne({ email })
//        if (!one) {
//            return res.status(404).json({
//                success: false,
//                message: 'user not found'
//            })
//        }
//        if (one.password === password) {
//            req.session.email = email
//            req.session.role = one.role
//            res.redirect('/')
//        } else {
//            return res.status(400).json({
//                success: false,
//                message: 'wrong password'
//            })
//        }
//    } catch (error) {
//        next(error)
//    }
//})

auth_router.post('/signout', async (req, res, next) => {
    try {
        return res.status(200).clearCookie('token').json({
            success: true,
            message: 'user signed out'
        })
    } catch (error) {
        next(error)
    }
})

//passport.authenticate('github', { scope: ['user:email'] })
auth_router.get('/github',  (req, res) => { })

auth_router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: 'fail-register-github' }),
    (req,res) => res.status(200).redirect('/')
)

auth_router.get('/fail-register-github', (req, res) => res.status(400).json({
    success: false,
    message: 'error auth'
}))

export default auth_router