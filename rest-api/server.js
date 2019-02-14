const Hapi = require('hapi');
const Knex = require('knex');
const { Model } = require('objection');
const dbConfig = require('./knexfile');
const { Vehicles } = require('./models/vehicles');

const server = Hapi.server({
  port: 8081,
  host: 'localhost',
  routes: {
    cors: { origin: ['*'] },
    validate: {
      failAction: async (request, h, err) => {
        console.error(err);
        throw err;
      }
    }
  }
});

server.route({
  method: 'GET',
  path: '/vehicles',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Vehicles
      .query()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the vehicles from the database'
  }
});

server.route({
  method: 'GET',
  path: '/vehicles/{vehicle_id}',
  handler: async (request, h) => {
    // NOTE: Debug is optional - prints SQL command and results into stdout
    // the request object allows us to get info about the request (like URL params as in this case)

    const response = await Vehicles
      .query()
    .findById(request.params.vehicle_id)
      .debug();

    return response;
  },
  options: {
    description: 'Gets a vehicle from the database by ID'
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!';
  }
});

server.route({
  method: 'GET',
  path: '/names/{name}',
  handler: (request, h) => {
    return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
  }
});

const init = async () => {
  // init database & ORM
  const knexRunTime = Knex(dbConfig['development']);
  Model.knex(knexRunTime);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

  // Log server error messages to the console
  server.events.on('log', (event, tags) => {
    if (tags.error) {
      console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
    }
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
