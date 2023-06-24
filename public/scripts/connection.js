//import auth_router from "../../src/routes/api/auth/auth.js"

const socket = io()

//document.querySelector('#log_out').addEventListener('click', log_out)
//
//function log_out(){
//    auth_router.post('/signout', async (req, res, next) => {
//        try {
//            req.session.destroy()
//            return res.status(200).json({
//                success: true,
//                message: 'user signed out'
//            })
//        } catch (error) {
//            next(error)
//        }
//    })
//}