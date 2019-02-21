
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('active_screens', table => {
      table.string('app_name');
      table.string('screen_name');
	    table.string('vehicle_id');
      table.timestamp('timestamp');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('active_screens');
};
