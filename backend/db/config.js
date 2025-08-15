import 'dotenv/config'
import pg from 'pg'

const { HOST, USER, PASSWORD, DATABASE } = process.env

const pool = new pg.Pool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Database Connected', res.rows[0])
  }
})

export default pool
