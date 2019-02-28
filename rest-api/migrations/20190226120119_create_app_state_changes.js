exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('app_state_changes', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('application_id').notNullable();
      table.foreign('application_id').references('id').inTable('applications');
      table.string('event_name');
	    table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
      table.timestamp('timestamp');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('app_state_changes');
};
