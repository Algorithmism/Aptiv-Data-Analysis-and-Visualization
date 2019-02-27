exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('active_screens', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('application_id').notNullable();
      table.foreign('app_name').references('id').inTable('applications');
      table.string('screen_name');
	    table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
      table.timestamp('timestamp');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('active_screens');
};


//app name is a uuid relates to id in applications
//vehicle id is a uuis relates to id in vehicles table
