import express from 'express'
import 'dotenv/config'
import Routes from './src/routes/user.routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', Routes)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))
