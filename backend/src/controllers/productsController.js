import { getCategoriesModel, getProductsModel, createProductModel, createOrderModel } from '../models/productsModel.js'
import camelcaseKeys from 'camelcase-keys'

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesModel()
    return res.status(201).json(categories)
  } catch (error) {
    return res.status(500)
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsModel()
    return res.status(201).json(products)
  } catch (error) {
    return res.status(500)
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = camelcaseKeys(req.body)
    const { id } = await createProductModel(product)
    return res.status(201).json({ message: 'Producto creado', id })
  } catch (error) {
    return res.status(500)
  }
}

export const createOrder = async (req, res) => {
  try {
    const cart = camelcaseKeys(req.body.cart)
    const user = req.body.user
    const id = await createOrderModel({ cart, user })
    return res.status(201).json({ message: 'Compra realizada', id })
  } catch (error) {
    return res.status(500)
  }
}
