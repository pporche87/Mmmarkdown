const express = require('express')
const app = express()
require('dotenv').config()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (request, response) => {
  response.render('home')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on:  ${process.env.APPLICATION_URL}:${port}`)
})
