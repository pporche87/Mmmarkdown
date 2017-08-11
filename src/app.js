const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const markdowns = require('./models/markdowns')
require('dotenv').config()

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (request, response) => {
  let dir = __dirname + '/data/'
  fs.readdir(dir, (error, files) => {
    if (error) {
      throw error
    } else {
      response.render('index', {files: files})
    }
  })
})

app.get('/:fileName', (request, response) => {
  let dir = __dirname + '/data/' + request.params.fileName

  fs.readFile(dir, 'utf8', (error, contents) => {
    if (error) throw error
    response.send({ fileText: contents })
  })
})

app.delete('/delete/:fileName', (request, response) => {
  let dir = __dirname + '/data/' + request.params.fileName

  fs.unlink(dir, (error) => {
    if (error) throw error
    response.sendStatus(200)
  })
})

app.post('/saveFile', (request, response) => {
  let dir = __dirname + '/data/' + request.body.fileName
  fs.writeFile(dir, request.body.fileText)
  response.sendStatus(200)
})

app.get('/markdowns', (request, response) => {
  markdowns.getMarkdowns()
    .then( result => {
      response.send(result)
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on: ${process.env.APPLICATION_URL}:${port}`) // eslint-disable-line no-console
})
