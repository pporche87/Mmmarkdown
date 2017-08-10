const fs = require('fs')

fs.readdir_promise = dir =>
  new Promise( (resolve, reject) => {
    fs.readdir(dir, (error, file_names) => {
      if(error) reject(error)
      else resolve(file_names)
    })
  })

module.exports = fs