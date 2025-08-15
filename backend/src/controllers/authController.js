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
      return res.status(401).json({ message: 'No autorizado' })
    }

    const token = generateToken(email)
    res.status(200).json({ token, email })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al autorizar' })
  }
}

export const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
