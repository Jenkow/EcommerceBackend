import { Router } from "express";
import User from "../../../models/user_model.js";
import validator from "../../../middlewares/validator.js";
import pass_is_8 from "../../../middlewares/pass_is_8.js";

const auth_router = Router()

auth_router.post('/register', validator, pass_is_8, async (req, res, next) => {
    try {
        const { email, name, password, photo, age } = req.body
        let user_data = {}
        if (photo && age) { user_data = { email, name, password, photo, age } }
        if (!photo && age) { user_data = { email, name, password, age } }
        if (photo && !age) { user_data = { email, name, password, photo } }
        await User.create(user_data)
        return res.status(201).json({
            succes: true,
            message: 'user created'
        })
    } catch (error) {
        next(error)
    }
})

auth_router.post('/signin', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const one = await User.findOne({ email })
        if (!one) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }
        if (one.password === password) {
            req.session.email = email
            req.session.role = one.role
            res.redirect('/')
            //return res.status(200).json({
            //    success: true,
            //    message: 'user signed in'
            //})
        } else {
            return res.status(400).json({
                success: false,
                message: 'wrong password'
            })
        }
    } catch (error) {
        next(error)
    }
})

auth_router.post('/signout', async (req, res, next) => {
    try {
        req.session.destroy()
        res.redirect('/')
        //return res.status(200).json({
        //    success: true,
        //    message: 'user signed out'
        //})
    } catch (error) {
        next(error)
    }
})

export default auth_router