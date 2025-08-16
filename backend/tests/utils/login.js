// import 'dotenv/config'
const { faker } = require('@faker-js/faker')
const jwt = require('jsonwebtoken')

const generateToken = () => {
  const email = faker.internet.email()
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = generateToken
