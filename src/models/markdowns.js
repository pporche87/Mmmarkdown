const markdowns = require('../database/markdowns')

module.exports = {
  getMarkdowns: () => markdowns.getMarkdowns()
}