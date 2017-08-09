const knex = require('./knex')

module.exports = {
  getMarkdowns: () => {
    knex.select('*').from('markdowns')
  }
}