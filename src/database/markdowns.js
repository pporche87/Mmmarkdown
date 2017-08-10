const knex = require('./knex')

const getMarkdowns = () =>
  knex.select('*').from('markdowns').orderBy('updated_at', 'desc')

const createMarkdown = file_name =>
  knex('markdowns').insert({file_name}).returning('*')

const deleteMarkdownByFilename = file_name =>
  knex.delete().from('markdowns').where('file_name', file_name).returning('*')

const deleteAll = () =>
  knex.delete().from('markdowns')

module.exports = {
  getMarkdowns,
  createMarkdown,
  deleteMarkdownByFilename,
  deleteAll
}