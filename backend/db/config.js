import 'dotenv/config'
import pg from 'pg'

const { HOST, USER, PASSWORD, DATABASE, DB_URL } = process.env

const pool = new pg.Pool({
  connectionString: DB_URL
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Database Connected', res.rows[0])
  }
})

export default pool
