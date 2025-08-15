import pool from '../../db/config.js'

export const findUser = async (email) => {
  const query = {
    text: 'SELECT id FROM users WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(query)
  return response.rows[0]
}
