import bcrypt from 'bcryptjs'
import pool from '../../db/config.js'

export const registerModel = async ({ email, password, name, lastName, address, phoneNumber, imgUrl, rol }) => {
  const hashPassword = bcrypt.hashSync(password)
  const query = {
    text: 'INSERT INTO users (email, password, name, last_name, address, phone_number, img_url, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING email',
    values: [email, hashPassword, name, lastName, address, phoneNumber, imgUrl, rol]
  }
  const response = await pool.query(query)
  return response.rows[0].email
}

export const getPassword = async (email) => {
  const query = {
    text: 'SELECT password FROM users WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(query)
  return response.rows[0].password
}

export const getUserModel = async (email) => {
  const query = {
    text: 'SELECT email, name, last_name, address, phone_number, rol, img_url FROM users WHERE email = $1',
    values: [email]
  }

  const response = await pool.query(query)
  return response.rows[0]
}
