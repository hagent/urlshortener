const express = require('express')

const { Url } = require('../models')
const getStringHash = require('../services/getStringHash')
const router = express.Router()

router
  .get('/', async (req, res, next) => {
    const urls = await Url.findAll()
    res.json(urls)
  })
  .post('/', async (req, res, next) => {
    const { url, name } = req.body
    let shortUrl = getStringHash(url)
    let alreadyExists = await Url.find({ where: { shortUrl } })
    let seed = 1
    while (alreadyExists) {
      shortUrl = getStringHash(url, seed++)
      alreadyExists = await Url.find({ where: { shortUrl } })
    }
    const urlEntity = await Url.create({
      url,
      name,
      shortUrl
    })
    res.json(urlEntity)
  })

module.exports = router
