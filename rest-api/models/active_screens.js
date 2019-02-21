const { Model } = require('objection');

class Active_Screens extends Model {

  static get tableName() {
      return 'active_screens';
  }
}

exports.Active_Screens = Active_Screens;
