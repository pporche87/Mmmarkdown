const router = require('express').Router()
const Markdowns = require('../../models/markdowns')

router.get('/:fileName', (request, response) => {
  Markdowns.getMarkdown(request.params.fileName)
    .then( fileInfo => {
      response.send({fileInfo})
    })
})

router.get('/', (request, response) => {
  Markdowns.getMarkdowns()
    .then( fileNames => {
      response.send(fileNames)
    })
})

router.post('/saveFile', (request, response) => {
  Markdowns.createMarkdown(request.body.fileName, request.body.fileText)
    .then( () => {
      console.log('Succeeded')
      response.sendStatus(200)
    })
})

module.exports = router