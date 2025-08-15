import { findUser } from '../services/userService.js'

export const checkRegisterUser = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'El email es requerido' })
    }

    const user = await findUser(email)

    if (user) {
      return res.status(409).json({ message: 'Usuario ya existente' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const checkLoginUser = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'El email es requerido' })
    }

    const user = await findUser(email)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}
