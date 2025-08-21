import pool from '../../db/config.js'

export const fetchWishlistModel = async (userId) => {
  const query = {
    text: `
    SELECT w.*, name, price, img_url
    FROM wishlist_items w
    LEFT JOIN products p
    ON product_id = p.id
    WHERE user_id = $1
    `,
    values: [userId]
  }

  const res = await pool.query(query)
  return res.rows
}

export const addWishlistModel = async ({ productId, userId }) => {
  const query = {
    text: 'INSERT INTO wishlist_items (product_id, user_id) VALUES ($1, $2) RETURNING product_id',
    values: [productId, userId]
  }

  await pool.query(query)
  const res = await fetchWishlistModel(userId)
  return res
}

export const deleteWishlistModel = async ({ productId, userId }) => {
  const query = {
    text: 'DELETE FROM wishlist_items WHERE product_id = $1 AND user_id = $2',
    values: [productId, userId]
  }

  await pool.query(query)
  const res = await fetchWishlistModel(userId)
  return res
}
