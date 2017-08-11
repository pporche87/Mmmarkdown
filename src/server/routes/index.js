const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const Markdowns = require('../../models/markdowns')


router.get('/', (request, response) => {
  Markdowns.getMarkdowns()
    .then()
  fs.readdir(path.join(__dirname, '../../data/'), (error, files) => {
    if (error) {
      throw error
    } else {
      response.render('index', {files: files})
    }
  })
})

router.use('/markdowns', require('./markdowns'))

module.exports = router