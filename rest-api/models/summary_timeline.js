const { Model } = require('objection');

class Summary_Timeline extends Model {

  static get tableName() {
      return 'summary_timeline';
  }

  static get relationMappings() {
    return {
      application: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/applications`,
        join: {
          from: 'summary_timeline.application_id',
          to: 'applications.id',
        }
      }
    };
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/vehicles`,
        join: {
          from: 'summary_timeline.vehicle_id',
          to: 'vehicles.id',
        }
      }
    };
  }


}

exports.Summary_Timeline = Summary_Timeline;
