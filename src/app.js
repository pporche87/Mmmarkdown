const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// This chunk of code is to prevent the annoying warning in Chrome when mixing back and forth between
// localhost and 127.0.0.1 which SHOULD simply be the same.
// I use 127.0.0.1 to prevent worrying if someone's hosts file is messed up or other DNS issues with localhost
// which is unreliable
app.use('/', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  response.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

// require('../test/tests.js')() // TODO: Replace quick tests with mocha-chai unit tests and use seperate database for testing

require('./models/markdowns').syncFileSystemToMarkdowns() // TODO This is async yet we're assuming it will always complete before user fires events! fortunately were lucky every time. but this is dangerous.

app.use('/', require('./server/routes'))
app.delete('/delete/:fileName', (request, response) => {
  let dir = __dirname + '/data/' + request.params.fileName

  fs.unlink(dir, (error) => {
    if (error) throw error
    response.sendStatus(200)
  })
})

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on: ${process.env.APPLICATION_URL}:${port}`) // eslint-disable-line no-console
})
