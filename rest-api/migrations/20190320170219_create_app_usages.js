exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable('app_usages', table => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.integer('avg_time');
      table.integer('max_time');
      table.integer('min_time');
      table.integer('stdev_time');
      table.integer('count_of_launches');
      table.integer('total_time');
      table.date('date');
      table.uuid('vehicle_id').notNullable();
      table.foreign('vehicle_id').references('id').inTable('vehicles');
      table.uuid('application_id').notNullable();
      table.foreign('application_id').references('id').inTable('applications');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('app_usages');
};
