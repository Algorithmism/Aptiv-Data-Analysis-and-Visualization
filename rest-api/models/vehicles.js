const { Model } = require('objection');

class Vehicles extends Model {

  static get tableName() {
      return 'vehicles';
  }


  static get temp() {
  		return knex.raw("select * from vehicles");
  }
}

exports.Vehicles = Vehicles;