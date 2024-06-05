import express from 'express';
const router = express.Router()
import cors from 'cors';
import { test, registerUser, loginUser, getProfile } from '../controllers/AuthController.js';

// middleware
// router.use(
//     cors({
//         credentials: true,
//         origin: 'http://127.0.0.1:5173'
//     })
// )



router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

export default router