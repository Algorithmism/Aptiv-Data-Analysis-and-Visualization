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
const { App_Usages } = require('./models/app_usages');

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

//gets all vehicles
server.route({
  method: 'GET',
  path: '/vehicles',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Vehicles
      .query();

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


//get request for app_state_changes Table
server.route({
  method: 'GET',
  path: '/app_state_changes',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await App_State_Changes
      .query().eager('application')
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the app_state_changes from the database'
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
      .query().eager('vehicle').eager('application')
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the data from the summary_timeline database'
  }
});


//get request for summary_timeline table with specific vehicle name
server.route({
  method: 'GET',
  path: '/summary_timeline/{vehicle_name}',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const response = await Summary_Timeline
      .query().eager('application').joinEager('vehicle').where('vehicle.name',request.params.vehicle_name)
      .debug();

    return response;
  },
  options: {
    description: 'Gets all the data from the summary_timeline database'
  }
});

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


//gets app_usages
server.route({
  method: 'GET',
  path: '/app_usages',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const dropTable = await Vehicles.raw(`drop table if exists temp1;`);



    const response = await Vehicles
      .raw(`
        drop table if exists temp1;
 create temp table if not exists temp1(application_id uuid,
                        vehicle_id uuid,
                        event_name varchar(45),
                        timestamp timestamp,
                        lead_timestamp timestamp,
                        lead_event varchar(45),
                        duration interval,
                        duration_seconds int);

 insert into temp1
 select application_id,
         vehicle_id,
         event_name,
         timestamp,
         lead(timestamp) over (partition by application_id, vehicle_id order by timestamp),
         lead(event_name) over (partition by application_id, vehicle_id order by timestamp) as lead_event,
         age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp),
         EXTRACT(SECOND FROM age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp))
     from app_state_changes
         where event_name in ('RESUMED','STOPPED')
             and date_trunc('day', timestamp) >= date_trunc('day', coalesce((select max(timestamp) from temp1), '1900-01-01'))
         order by application_id, timestamp desc;

 drop table if exists usage_over_time;

 create temp table if not exists usage_over_time( vehicle_id uuid,
                        application_id uuid,
                        total_time interval,
                        uses bigint,
                        max_time interval,
                        min_time interval,
                        avg_time interval,
                        std_dev interval,
                        variance bigint,
                        day timestamp,
                         week timestamp,
                         month timestamp,
                         year timestamp,
                         CONSTRAINT basic UNIQUE (vehicle_id,
                                                     application_id,
                                                     day,
                                                     week,
                                                     month,
                                                     year)
                     );
 insert into usage_over_time
 select vehicle_id,
         application_id,
         sum(duration) as tot_time,
         count(*) as uses,
         max(duration) as max_time,
         min(duration) as min_time,
         avg(duration) as avg_time,
         stddev_samp(duration_seconds)* interval '1 sec' as std_dev,
         variance(duration_seconds) as variance



     from temp1
     where event_name = 'RESUMED'
         and lead_event = 'STOPPED'
     group by vehicle_id, application_id
     order by vehicle_id, application_id
     ;
`);

const insert = await Vehicles
  .raw(`
    select v.name as vehicle_name, a.name as application_name, total_time, uses, max_time, min_time, avg_time, std_dev, variance, day, week, month, year from usage_over_time
      join applications a on a.id = application_id
      join vehicles v on v.id = vehicle_id;`);

    //console.log(insert.rows);

    return insert.rows;
  },
  options: {
    description: 'Gets all the vehicles from the database'
  }
});


//gets app_usages table from specific vehicle

server.route({
  method: 'GET',
  path: '/app_usages/{vehicle_name}',
  handler: async (request, h) => {
    //NOTE: Debug is optional - prints SQL command and results into stdout

    const dropTable = await Vehicles.raw(`drop table if exists temp1;`);



    const response = await Vehicles
      .raw(`
        drop table if exists temp1;
 create temp table if not exists temp1(application_id uuid,
                        vehicle_id uuid,
                        event_name varchar(45),
                        timestamp timestamp,
                        lead_timestamp timestamp,
                        lead_event varchar(45),
                        duration interval,
                        duration_seconds int);

 insert into temp1
 select application_id,
         vehicle_id,
         event_name,
         timestamp,
         lead(timestamp) over (partition by application_id, vehicle_id order by timestamp),
         lead(event_name) over (partition by application_id, vehicle_id order by timestamp) as lead_event,
         age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp),
         EXTRACT(SECOND FROM age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp))
     from app_state_changes
         where event_name in ('RESUMED','STOPPED')
             and date_trunc('day', timestamp) >= date_trunc('day', coalesce((select max(timestamp) from temp1), '1900-01-01'))
         order by application_id, timestamp desc;

 drop table if exists usage_over_time;

 create temp table if not exists usage_over_time( vehicle_id uuid,
                        application_id uuid,
                        total_time interval,
                        uses bigint,
                        max_time interval,
                        min_time interval,
                        avg_time interval,
                        std_dev interval,
                        variance bigint,
                        day timestamp,
                         week timestamp,
                         month timestamp,
                         year timestamp,
                         CONSTRAINT basic UNIQUE (vehicle_id,
                                                     application_id,
                                                     day,
                                                     week,
                                                     month,
                                                     year)
                     );
 insert into usage_over_time
 select vehicle_id,
         application_id,
         sum(duration) as tot_time,
         count(*) as uses,
         max(duration) as max_time,
         min(duration) as min_time,
         avg(duration) as avg_time,
         stddev_samp(duration_seconds)* interval '1 sec' as std_dev,
         variance(duration_seconds) as variance,
         date_trunc('day', timestamp ) as day,
         date_trunc('week', timestamp ) as week,
         date_trunc('month', timestamp ) as month,
         date_trunc('year', timestamp ) as year


     from temp1
     where event_name = 'RESUMED'
         and lead_event = 'STOPPED'
     group by
                 rollup(vehicle_id, application_id, date_trunc('year', timestamp ), date_trunc('month', timestamp ), date_trunc('week', timestamp ), date_trunc('day', timestamp ))
     order by year, month, week, day, vehicle_id, application_id;
`);

const insert = await Vehicles
  .raw(`
    select v.name as vehicle_name, a.name as application_name, total_time, uses, max_time, min_time, avg_time, std_dev, variance, day, week, month, year from usage_over_time

      join applications a on a.id = application_id
      join vehicles v on v.id = vehicle_id
    where v.name = ${request.params.vehicle_name};`);


    console.log(insert.rows);

    return insert.rows;
  },
  options: {
    description: 'Gets all the vehicles from the database'
  }
});







//////////EXAMPLE API CALLS/////////

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
////////////////////////////////////


/////////NOT API CALLS/////////////
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
///////////////////////////////////

//order by for sorting by timestamp
