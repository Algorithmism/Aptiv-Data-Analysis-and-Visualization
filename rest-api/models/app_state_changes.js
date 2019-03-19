const { Model } = require('objection');

class App_State_Changes extends Model {

  static get tableName() {
      return 'app_state_changes';
  }
}

exports.App_State_Changes = App_State_Changes;
