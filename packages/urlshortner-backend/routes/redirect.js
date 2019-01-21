const express = require('express')
const router = express.Router()

const { Url } = require('../models')

router.get('/:shortUrl', async (req, res, next) => {
  console.log(req.baseUrl)
  const url = await Url.find({
    where: {
      shortUrl: req.params.shortUrl
    }
  })
  if (url) {
    res.redirect(url.url)
  } else {
    res.status(404).send('Not found')
  }
})

module.exports = router
