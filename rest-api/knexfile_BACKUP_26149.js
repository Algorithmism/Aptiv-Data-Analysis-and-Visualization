// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'localhost',
      user: 'postgres',
<<<<<<< HEAD
      password: 'ilike2k6'
=======
      password: 'password'
>>>>>>> e2a33bc734114e1d43a50e2543817c9df979b778
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'andromeda',
      user: 'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
