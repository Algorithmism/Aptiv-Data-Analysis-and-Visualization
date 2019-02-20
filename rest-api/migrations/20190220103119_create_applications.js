exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('applications', table => {
	    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('name').notNullable();
      table.string('version');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('applications');
};
