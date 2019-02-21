const Hapi = require('hapi');
const Knex = require('knex');
const { Model } = require('objection');
const dbConfig = require('./knexfile');
const { Vehicles } = require('./models/vehicles');
const { Applications } = require('./models/applications');
const { Active_Screens } = require('./models/active_screens');

//server settings
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

//gets all vehicles
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

//gets a vehicle via an ID
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

//get request for applications
server.route({
  method: 'GET',
  path: '/applications',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Applications
      .query()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the applications from the database'
  }
});

//gets an application via an ID
server.route({
  method: 'GET',
  path: '/applications/{application_id}',
  handler: async (request, h) => {
    // NOTE: Debug is optional - prints SQL command and results into stdout
    // the request object allows us to get info about the request (like URL params as in this case)

    const response = await Applications
      .query()
    .findById(request.params.application_id)
      .debug();

    return response;
  },
  options: {
    description: 'Gets an application from the database by ID'
  }
});

//get request for active_screens
server.route({
  method: 'GET',
  path: '/active_screens',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Active_Screens
      .query()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the active screens from the database'
  }
});

//gets an active_screen via an ID
server.route({
  method: 'GET',
  path: '/active_screens/findByVehicleID/{vehicle_id}',
  handler: async (request, h) => {
    // NOTE: Debug is optional - prints SQL command and results into stdout
    // the request object allows us to get info about the request (like URL params as in this case)

    const response = await Active_Screens
      .query()
    .where('vehicle_id',request.params.vehicle_id)
      .debug();

    return response;
  },
  options: {
    description: 'Gets an active_screen from the database by vehicle ID'
  }
});

//hello world get request
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!';
  }
});

//another hello world example
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
