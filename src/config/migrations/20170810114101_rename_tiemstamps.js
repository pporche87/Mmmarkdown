exports.up = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.table('markdowns', table => {
    table.renameColumn('createdAt', 'created_at')
    table.renameColumn('updatedAt', 'updated_at')
  })

exports.down = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.table('marksdowns', table => {
    table.renameColumn('created_at', 'createdAt')
    table.renameColumn('updated_at', 'updatedAt')
  })