exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('button_presses', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('button_name');
      table.timestamp('timestamp');
      table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('button_presses');
};
