var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    name: '111',
    url: '222',
    shortUrl: '333'
  }])
})

module.exports = router
