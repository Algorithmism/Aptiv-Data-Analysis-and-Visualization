#Rest API

To turn on the server run `npm start` in the `rest-api` folder

## How do I set up?

1. Install Postgres
2. Install Knex globally: `npm install -g knex`
3. Run migrations from inside the `rest-api` directory: `knex migrate:latest`
4. Seed the database: `knex seed:run`
5. Run `npm start`
6. Open Postman and connect to `localhost:8080/`

## Tips from Abram

1. You use knex to create migrations
  * A migration is a change to the database schema - you want to add a new table, new column to an existing table, remove an existing table's column, remove a table, etc
  * You write a new migration for every set of changes you want to perform to the database
  * Migrations are essential in production enviroments because they prevent you from data loss by being able to write a script to change the database, rather than rely on SQL and CLI
  * For more info: https://guides.rubyonrails.org/v3.2/migrations.html (note we are not using rails, but they have good beginner docs for web apps)
2. You use Objection to write code to access/change the data in the database in the REST API code
  * This is where you use a Model (in the `models` directory), which maps one to one to each table
  * The model is the programatic representation of a table, which you use the model to access the table's data
  * The model is an OOP object that allows you to call functions on it that will manipulate the table to gain access to the data, aggregate the data (with min, max, avg, etc), create new data, updated old data, delete data, and perform joins on the data with other tables. Objection does this better than most ORMs in my opinion with Eager loading (https://vincit.github.io/objection.js/#relate-queries)
  * For more info: https://guides.rubyonrails.org/active_record_basics.html (note we are not using rails, but they have good beginner docs for web apps)
3. You use Hapi to write code to provide REST API routes (via HTTP) to the web browser
  * This is where all the magic happens (err...business/application logic). You write all the code that is going to be ran when a user clicks a specific page here.
  * This is what's calling the database query with Objection and then returning the results to the user via JSON
  * Specify a GET request and a route (the URL) to provide data to the web app
  * For more info: https://guides.rubyonrails.org/action_controller_overview.html (note we are not using rails, but they have good beginner docs for web apps)

NOTE: since the concept docs I listed about discuss Ruby on Rails - only the first part of the reading is relevant since we aren't doing Rails - you might be able to find other docs that are actually better, but in this short time, this is the best I could come up with

## Documentation

For more help with migrations and seeds, read the Knex's documentation: https://knexjs.org/#Migrations-CLI

For more help with the ORM, read Objection's documentation: https://vincit.github.io/objection.js/

For more help with the REST-API, read Hapi's documentation: https://hapijs.com/tutorials & https://hapijs.com/api