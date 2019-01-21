const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({
    baseRedirectUrl: process.env.BASE_REDIRECT_URL
  })
})

module.exports = router
