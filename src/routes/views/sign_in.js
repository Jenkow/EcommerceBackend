import { Router } from "express";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'sign_in',
                {
                    title: 'Sign in'
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router