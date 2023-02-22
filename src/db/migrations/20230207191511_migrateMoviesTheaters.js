//const { table } = require('db/connection');
exports.up = async function (knex) {
  await knex.schema.createTable('movies_theaters', (table) => {
    table.integer('movie_id').unsigned().notNullable();
    table
        .foreign('movie_id')
        .references('movie_id')
        .inTable('movies')
        .onDelete('cascade');
    table.integer('theater_id').unsigned().notNullable();
    table.boolean('is_showing');
    table.timestamps(true, true);

  });
  await knex.schema.createTable('theaters', (table) => {
    table.increments('theater_id').primary();
    table.string('name');
    table.string('address_line_1');
    table.string('address_line_2');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.timestamps(true, true)
  })
  await knex.schema.alterTable('movies_theaters', (table) => {
    table
        .foreign('theater_id')
        .references('theater_id')
        .inTable('theaters')
        .onDelete('cascade');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies_theaters');
};
