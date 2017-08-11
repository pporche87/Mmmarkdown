exports.up = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.raw(`
    ALTER TABLE markdowns 
    ADD CONSTRAINT markdowns_file_name_key
    UNIQUE (file_name);
  `)
exports.down = (knex, Promise) => // eslint-disable-line no-unused-vars
  knex.raw(`
    ALTER TABLE markdowns
    DROP CONSTRAINT markdowns_file_name_key
  `)