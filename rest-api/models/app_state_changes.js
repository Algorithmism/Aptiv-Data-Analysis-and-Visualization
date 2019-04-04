const { Model } = require('objection');

class App_State_Changes extends Model {

  static get tableName() {
      return 'app_state_changes';
  }

  static get relationMappings() {
    return {
      application: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/applications`,
        join: {
          from: 'app_state_changes.application_id',
          to: 'applications.id',
        }
      }
    };
  }
}

exports.App_State_Changes = App_State_Changes;
