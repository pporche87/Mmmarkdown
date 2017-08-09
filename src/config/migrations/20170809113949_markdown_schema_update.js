
exports.up = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.table('markdowns', table => {
    table.dropColumn('deletedAt')
    table.renameColumn('markdown_input', 'file_name')
  })

exports.down = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.table('marksdowns', table => {
    table.dateTime('deletedAt').nullable()
    table.renameColumn('file_name', 'markdown_input')
  })