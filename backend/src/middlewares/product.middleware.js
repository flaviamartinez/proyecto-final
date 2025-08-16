import camelcaseKeys from 'camelcase-keys'

export const checkEmptyCart = async (req, res, next) => {
  try {
    const { cart } = req.body

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carro esta vacio',
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

export const checkAllFields = async (req, res, next) => {
  try {
    const product = camelcaseKeys(req.body)
    if (!product.name || !product.description || !product.price || product.img_url || product.category_id) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios',
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
