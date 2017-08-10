const router = require('express').Router()
const fs = require('fs')
const Markdowns = require('../../models/markdowns')

router.get('/:fileName', (request, response) => {
  let dir = __dirname + '/data/' + request.params.fileName

  fs.readFile(dir, 'utf8', (error, contents) => {
    if (error) throw error
    response.send({ fileText: contents })
  })
})

router.get('/', (request, response) => {
  Markdowns.getMarkdowns()
    .then( result => {
      response.send(result)
    })
})

module.exports = router