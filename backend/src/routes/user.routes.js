import { Router } from 'express'
import { registerUser, getUser } from '../controllers/usersController.js'
import { getCategories, getProducts, createProduct } from '../controllers/productsController.js'
import { checkRegisterUser, checkLoginUser } from '../middlewares/auth.middleware.js'
import { authUser } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/token.middleware.js'

const router = Router()

router.post('/register', checkRegisterUser, registerUser)
router.post('/login', checkLoginUser, authUser)
router.get('/me', verifyToken, getUser)
router.get('/categories', getCategories)
router.get('/products', getProducts)
router.post('/products', createProduct)

export default router
