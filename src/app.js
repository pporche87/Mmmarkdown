const express = require('express')
const app = express()
const path = require('path')
const marked = require('marked')
require('dotenv').config()

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (request, response) => {
  response.render('index')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on: ${process.env.APPLICATION_URL}:${port}`)
})
