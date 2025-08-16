import pool from '../../db/config.js'
import { findUser } from '../services/userService.js'

export const getCategoriesModel = async () => {
  const query = 'SELECT * FROM category'
  const response = await pool.query(query)
  return response.rows
}

export const getProductsModel = async () => {
  const query = `
    SELECT p.id, p.name, description, price, img_url, c.name AS category
    FROM products p
    LEFT JOIN category c
    ON category_id = c.id
  `
  const response = await pool.query(query)
  return response.rows
}

export const createProductModel = async ({ name, description, price, category, stock, imgUrl }) => {
  const query = {
    text: `INSERT INTO products (name, description, price, img_url, category_id) VALUES($1, $2, $3, $4, $5)
    RETURNING id`,
    values: [name, description, price, imgUrl, category]
  }

  const response = await pool.query(query)
  const id = response.rows[0].id

  const queryInv = {
    text: 'INSERT INTO inventory (product_id, stock) VALUES ($1, $2) RETURNING stock',
    values: [id, stock]
  }

  await pool.query(queryInv)
  return response.rows[0]
}

export const createOrderModel = async ({ cart, user }) => {
  const total = cart.reduce((sum, p) => sum + (p.qty * p.price), 0)
  const userId = await findUser(user)
  const query = {
    text: 'INSERT INTO orders (user_id, total) VALUES($1, $2) RETURNING id',
    values: [userId.id, total]
  }

  const response = await pool.query(query)
  const orderId = response.rows[0].id

  const values = []
  const params = []

  cart.forEach((p, i) => {
    params.push(orderId, p.id, p.qty)
    values.push(`($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
  })

  const queryItems = {
    text: `INSERT INTO order_items (order_id, product_id, quantity) VALUES ${values.join(', ')};`,
    values: params
  }

  await pool.query(queryItems)
  return orderId
}
