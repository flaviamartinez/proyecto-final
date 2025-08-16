import { getCategoriesModel, getProductsModel, createProductModel, createOrderModel } from '../models/productsModel.js'
import camelcaseKeys from 'camelcase-keys'

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesModel()
    return res.status(200).json({
      success: true,
      message: 'Categorias obtenidas correctamente',
      data: categories
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsModel()
    return res.status(200).json({
      success: true,
      message: 'Productos obtenidos correctamente',
      data: products
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = camelcaseKeys(req.body)
    const { id } = await createProductModel(product)
    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: { id }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}

export const createOrder = async (req, res) => {
  try {
    const cart = camelcaseKeys(req.body.cart)
    const user = req.body.user
    const id = await createOrderModel({ cart, user })
    return res.status(201).json({
      success: true,
      message: 'Compra realizada exitosamente',
      data: { id }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error inesperado',
      error
    })
  }
}
