const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (request, response) => {
  response.render('home')
})

const port = 3000

app.listen(port, () => {
  console.log('App listening on Port:', port)
})
