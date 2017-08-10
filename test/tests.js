module.exports = () => {
  const db = require('../src/models/markdowns')

  db.syncFileSystemToMarkdowns() // Make database match file system to prepare for clean testing
    .then( () => db.createMarkdown('randomFileName.md') ) // expect createMarkdown to create markdown for get later
    .then( () => db.getMarkdowns() ) // expect getMarkdowns to display last createdMarkown
    .then( result => {
      console.log('get result: ', result)
      return db.deleteMarkdownByFilename('randomFileName.md') // expect delete to remove all randomFileName's from previous creates and return deleted markdown
    })
    .then( result => {
      console.log('deletion result: ', result)
    })
}