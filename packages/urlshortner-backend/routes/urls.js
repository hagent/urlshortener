const express = require('express')
const router = express.Router()

const { Url } = require('../models')

const SHORT_URL_LENGTH = 5

function createShortUrl() {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < SHORT_URL_LENGTH; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

router
  .get('/', async (req, res, next) => {
    const urls = await Url.findAll()
    res.json(urls)
  })
  .post('/', async (req, res, next) => {
    let shortUrl = createShortUrl()
    let alreadyExists = await Url.find({ where: { shortUrl } })
    while (alreadyExists) {
      console.log('already exists ', shortUrl)
      shortUrl = createShortUrl()
      alreadyExists = await Url.find({ where: { shortUrl } })
    }
    const url = await Url.create({
      ...req.body,
      shortUrl
    })
    res.json(url)
  })

module.exports = router
