exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('ignitions', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.date('date');
      table.timestamp('start_timestamp');
      table.timestamp('stop_timestamp')
      table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ignitions');
};
