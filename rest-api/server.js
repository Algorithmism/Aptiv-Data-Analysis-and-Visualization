const Hapi = require('hapi');
const Knex = require('knex');
const { Model } = require('objection');
const dbConfig = require('./knexfile');
const { Vehicles } = require('./models/vehicles');
const { Applications } = require('./models/applications');
const { Active_Screens } = require('./models/active_screens');
const { Button_Presses } = require('./models/button_presses');
const { App_State_Changes } = require('./models/app_state_changes');
const { Summary_Timeline } = require('./models/summary_timeline');

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

//get request for button_presses Table
server.route({
  method: 'GET',
  path: '/button_presses',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Button_Presses
      .query()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the button_presses from the database'
  }
});

//get request for button_presses via an id
server.route({
  method: 'GET',
  path: '/button_presses/findByVehicleID/{vehicle_id}',
  handler: async (request, h) => {
    // NOTE: Debug is optional - prints SQL command and results into stdout
    // the request object allows us to get info about the request (like URL params as in this case)

    const response = await Button_Presses
      .query()
    .where('vehicle_id',request.params.vehicle_id)
      .debug();

    return response;
  },
  options: {
    description: 'Gets an button press from the database by vehicle ID'
  }
});

//get request for summary_timeline table
server.route({
  method: 'GET',
  path: '/summary_timeline',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Summary_Timeline
      .query()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the data from the summary_timeline database'
  }
});




//helper function for sorting json object array
function predicateBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}

//begining of data massaging
server.route({
  method: 'GET',
  path: '/create_summary_timeline',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout
    var all_data = [];

    button_presses = await Button_Presses.query().debug();

    active_screens = await Active_Screens.query().debug();

    //console.log(button_presses);

    for(var i = 0; i < button_presses.length; i++) {
      var obj = button_presses[i];
      all_data.push(obj);
    }

    for(var i = 0; i < active_screens.length; i++) {
      var obj = active_screens[i];
      all_data.push(obj);
    }

    all_data.sort( predicateBy("timestamp") );
    //console.log(all_data);



    for (var i = 0; i < all_data.length; i++){
      let ev = all_data[i];
      let event_name = null;
      let event = null;
	    let application_id = null;

	    if ('application_id' in ev){
	  	  application_id = ev.application_id;
	    }

      if('screen_name' in ev) {
        /* active_screen */
        event_name = 'Screen Change';
        event = ev.screen_name;
      }

      if('button_name' in ev) { /* button press */
        event_name = 'Button Press';
        event = ev.button_name;
      }
      if('event_name' in ev) {
        /* app_state_change */
        evet = ev.event_name;
        if(event.event_name === 'STARTED')
          eventName = 'Application launched';
        if(event.event_name === 'RESUMED')
          eventName = 'Application in Foreground';
        if(event.event_name === 'PAUSED')
          eventName = 'Application Running In the Background';
        if(event.event_name === 'STOPPED')
          eventName = 'Application closed';
      }

      await Summary_Timeline
      .query()
      .insert({
      event_name: event_name,
      event: event,
      timestamp: ev.timestamp,
      vehicle_id: ev.vehicle_id,
	     application_id: application_id
      });

    }
    return 1;


    //return response;
  }

});


//clear summary timeline for // DEBUG:
//get request for summary_timeline table
server.route({
  method: 'GET',
  path: '/clear_summary_timeline',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Summary_Timeline
      .query()
      .delete()
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the data from the summary_timeline database'
  }
});

//hello world get request
server.route({
  method: 'GET',
  path: '/app_state_changes',
  handler: (request, h) => {
    const response = await App_State_Changes
      .query()
      .eager('application');
    
    return response;
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


//order by for sorting by timestamp
