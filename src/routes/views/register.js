import { Router } from "express";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'register',
                {
                    title: 'Register'
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router