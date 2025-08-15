import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')

    if (!token) {
      return res.status(400).json({ message: 'Debe existir el token' })
    }

    const extractToken = token.split(' ')[1]
    const decoded = jwt.verify(extractToken, process.env.JWT_SECRET)
    req.user = decoded.email
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Error verificando token' })
  }
}
