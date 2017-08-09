exports.up = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.createTableIfNotExists('markdowns', table => {
    table.increments('id').unsigned().primary()
    table.dateTime('createdAt').notNull()
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable()

    table.string('markdown_input').notNull()
  })

exports.down = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.schema.dropTableIfExists('markdowns')