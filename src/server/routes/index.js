const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/', (request, response) => {
  let dir = path.join(__dirname, '../../data/')
  console.log('dir: ', dir)
  fs.readdir(dir, (error, files) => {
    console.log('stuff: ', error, files)
    if (error) {
      throw error
    } else {
      response.render('index', {files: files})
    }
  })
})

router.post('/saveFile', (request, response) => {
  let dir = __dirname + '/data/' + request.body.fileName
  fs.writeFile(dir, request.body.fileText)
  response.sendStatus(200)
})

router.use('/markdowns', require('./markdowns'))

module.exports = router