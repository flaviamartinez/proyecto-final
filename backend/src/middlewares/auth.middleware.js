import { findUser } from '../services/userService.js'

export const checkRegisterUser = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El email es requerido',
        data: null
      })
    }

    const user = await findUser(email)

    if (user) {
      return res.status(409).json({
        success: false,
        message: 'Usuario ya existente',
        data: null
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}

export const checkLoginUser = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El email es requerido',
        data: null
      })
    }

    const user = await findUser(email)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
        data: null
      })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}
