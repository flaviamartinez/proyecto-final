import { registerModel, getUserModel } from '../models/usersModel.js'
import camelcaseKeys from 'camelcase-keys'
import { generateToken } from './authController.js'

export const registerUser = async (req, res) => {
  try {
    const data = {
      ...camelcaseKeys(req.body),
      rol: 'user'
    }
    const email = await registerModel(data)
    const token = generateToken(email)
    return res.status(201).json({ message: 'Usuario creado:', token, email })
  } catch (error) {
    return res.status(500)
  }
}

export const getUser = async (req, res) => {
  try {
    const email = req.user
    const user = await getUserModel(email)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500)
  }
}
