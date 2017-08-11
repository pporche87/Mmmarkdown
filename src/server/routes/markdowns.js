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

router.get('/saveFile', (request, response) => {
  Markdowns.createMarkdown(request.body.fileName, request.body.fileText)
    .then( () => {
      console.log('Succeeded')
      response.sendStatus(200)
    })
})

router.delete('/:fileName/delete', (request, response) => {
  let dir = __dirname + '/data/' + request.params.fileName

  fs.unlink(dir, (error) => {
    if (error) throw error
    response.sendStatus(200)
  })
})

module.exports = router