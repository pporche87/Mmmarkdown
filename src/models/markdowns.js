const markdowns = require('../database/markdowns')
const path = require('path')
const fs = require('fs')
const arrayFunctions = require('../helpers/array')
const Errors = require('../config/errors.json')
const util = require('util')

const syncFileSystemToMarkdowns = () =>
  markdowns.deleteAll()
    .then( () => util.promisify(fs.readdir)((path.join(__dirname, '../data/'))) )
    .then( file_names => 
      Promise.all( file_names.map(file_name => markdowns.createMarkdown(file_name)) )
    )

const getMarkdowns = () =>
  Promise.all([
    markdowns.getMarkdowns(),
    util.promisify(fs.readdir)((path.join(__dirname, '../data/')))
  ])
    .then( results => {
      return {
        databaseFileNames: results[0].map( fileInfo => fileInfo.file_name ),
        fileSystemFileNames: results[1]
      }
    })
    .then( ({databaseFileNames, fileSystemFileNames}) => {
      if(arrayFunctions.equals(databaseFileNames, fileSystemFileNames)) {
        return fileSystemFileNames
      } else {
        throw new Error(Errors.databaseFilesystemNotInSync + '\nFileSystem: ' + fileSystemFileNames + '\nDatabase: ' + databaseFileNames)
      }
    })

const getMarkdown = file_name =>
  util.promisify(fs.readFile)(path.join(__dirname, '../data/', file_name), 'utf8')
    .then( (contents) => ({ fileText: contents, fileName: file_name }))

const createMarkdown = (file_name, file_content) =>
  Promise.all([
    markdowns.createMarkdown(file_name),
    fs.writeFile(path.join(__dirname, '../data/', file_name), file_content)
  ])
    .catch( error => {
      if(error.code === '23505') { // 23505 is for duplicate key - soft fail
        console.error('Duplicate key. Ignoring creation of file.') // eslint-disable-line no-console
        return null
      }
      else throw error
    })

module.exports = {
  getMarkdowns,
  getMarkdown,
  createMarkdown,
  deleteMarkdownByFilename: markdowns.deleteMarkdownByFilename,
  syncFileSystemToMarkdowns
}