import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { getPassword } from '../models/usersModel.js'

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await getPassword(email)
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado',
        data: null
      })
    }

    const token = generateToken(email)

    res.status(200).json({
      success: true,
      messsage: 'Usuario autenticado correctamente',
      data: { token, user: email }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}

export const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
