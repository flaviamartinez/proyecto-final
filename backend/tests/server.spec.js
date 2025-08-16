import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import { faker } from '@faker-js/faker'

describe('User Auth', () => {
  describe('POST /register', () => {
    const endpoint = '/api/register'

    it('should register a new user', async () => {
      const res = await request(app).post(endpoint).send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        img_url: faker.image.url(),
        rol: 'user'
      })
      expect(res.status).toBe(201)
      expect(res.body.data).toMatchObject({
        token: expect.any(String),
        email: expect.any(String)
      })
    })

    it('should fail if email is missing', async () => {
      const res = await request(app).post(endpoint).send({
        password: faker.internet.password(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        img_url: faker.image.url(),
        rol: 'user'
      })
      expect(res.status).toBe(400)
    })

    it('should fail if user already exists', async () => {
      const res = await request(app).post(endpoint).send({
        email: 'admin@skincare.com',
        password: faker.internet.password(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        img_url: faker.image.url(),
        rol: 'user'
      })
      expect(res.status).toBe(409)
    })
  })

  describe('POST /login', () => {
    const endpoint = '/api/login'

    it('should login successfully', async () => {
      const fakeUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number(),
        img_url: faker.image.url(),
        rol: 'user'
      }
      await request(app).post('/api/register').send(fakeUser)
      const res = await request(app).post(endpoint).send(fakeUser)
      expect(res.status).toBe(200)
      expect(res.body.data).toMatchObject({
        token: expect.any(String),
        user: expect.any(String)
      })
    })

    it('should fail with wrong password', async () => {
      const res = await request(app).post(endpoint).send({
        email: 'admin@skincare.com',
        password: 'invalidPassword'
      })
      expect(res.status).toBe(401)
    })

    it('should fail if email is missing', async () => {
      const res = await request(app).post(endpoint).send({
        password: faker.internet.password()
      })
      expect(res.status).toBe(400)
    })

    it('should fail if email is not registered', async () => {
      const res = await request(app).post(endpoint).send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      expect(res.status).toBe(404)
    })
  })

  describe('GET /me', () => {
    const endpoint = '/api/me'
    it('should return user info with valid token', async () => {
      const user = {
        email: 'admin@skincare.com',
        password: 'PasswordAdmin'
      }
      const { body } = await request(app).post('/api/login').send(user)
      const res = await request(app).get(endpoint).set('Authorization', `Bearer ${body.data.token}`)
      expect(res.status).toBe(200)
      expect(res.body.data).toMatchObject({
        email: expect.any(String),
        name: expect.any(String),
        last_name: expect.any(String),
        address: expect.any(String),
        phone_number: expect.any(String),
        rol: expect.any(String)
      })
      expect(
        typeof res.body.data.img_url === 'string' || res.body.data.img_url === null
      ).toBe(true)
    })

    it('should fail with missing token', async () => {
      const res = await request(app).get(endpoint)
      expect(res.status).toBe(400)
    })
  })
})

describe('Product Management', () => {
  describe('GET /categories', () => {
    it('should return all categories', async () => {
      const res = await request(app).get('/api/categories')
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /products', () => {
    it('should return products', async () => {
      const res = await request(app).get('/api/products')
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('POST /products', () => {
    const endpoint = '/api/products'
    it('should create a new product', async () => {
      const res = await request(app).post(endpoint).send({
        name: 'Crema Reparadora Nocturna HydraSleep',
        description: 'Crema facial nutritiva de uso nocturno con manteca de karité, niacinamida y péptidos regenerativos.',
        price: 26900,
        category: 4,
        stock: 4,
        img_url: faker.image.url()
      })
      expect(res.status).toBe(201)
      expect(res.body.data).toHaveProperty('id')
    })

    it('should fail with missing fields', async () => {
      const res = await request(app).post(endpoint).send({
        name: 'Crema Reparadora Nocturna HydraSleep',
        description: 'Crema facial nutritiva de uso nocturno con manteca de karité, niacinamida y péptidos regenerativos.',
        category: 4,
        stock: 4,
        img_url: faker.image.url()
      })
      expect(res.status).toBe(400)
    })
  })
})

describe('Orders', () => {
  describe('POST /buy', () => {
    const endpoint = '/api/buy'

    it('should create an order with products', async () => {
      const res = await request(app).post(endpoint).send({
        cart: [
          {
            category: 'Limpiadores',
            description: 'Elimina impurezas con carbón activado.',
            id: 3,
            img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pwkkfSvTC3GPK_yZGe1qazBGj9XLFqmqsQ&s',
            name: 'Gel limpiador detox',
            price: 15000,
            qty: 1
          }
        ],
        user: 'admin@skincare.com'
      })
      expect(res.status).toBe(201)
      expect(res.body.data).toHaveProperty('id')
    })

    it('should fail if cart is empty', async () => {
      const res = await request(app).post(endpoint).send({
        cart: [],
        user: 'admin@skincare.com'
      })
      expect(res.status).toBe(400)
    })
  })
})
