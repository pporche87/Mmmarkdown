exports.up = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.raw(`
    ALTER TABLE markdowns 
    ALTER COLUMN created_at 
    SET DEFAULT CURRENT_TIMESTAMP
  `)
exports.down = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.raw(`
    ALTER TABLE markdowns 
    ALTER COLUMN created_at 
    DROP DEFAULT
  `)