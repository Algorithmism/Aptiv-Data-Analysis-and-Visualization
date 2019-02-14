const { Model } = require('objection');

class Vehicles extends Model {

  static get tableName() {
      return 'vehicles';
  }
}

exports.Vehicles = Vehicles;