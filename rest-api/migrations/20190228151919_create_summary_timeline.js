exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('summary_timeline', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('event_name');
      table.string('event');
      table.timestamp('timestamp')
      table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
      table.uuid('application_id');
      table.foreign('application_id').references('id').inTable('applications');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('summary_timeline');
};
