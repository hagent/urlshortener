const request = require('supertest')
const app = require('../app')

const { Url } = require('../models')

describe('redirect route', () => {
  it('should redirect to a new url', async () => {
    Url.find = jest.fn().mockImplementation(() => Promise.resolve({ url: 'redirect_url' }))
    const response = await request(app)
      .get('/r/shorturl')
      .send({ images: ['someimage'] })
    console.log({ response })
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe('redirect_url')
  })

  it('should return 404 if not found', async () => {
    Url.find = jest.fn().mockImplementation(() => Promise.resolve(null))
    const response = await request(app)
      .get('/r/shorturl')
      .send({ images: ['someimage'] })
    console.log({ response })
    expect(response.statusCode).toBe(404)
  })
})
