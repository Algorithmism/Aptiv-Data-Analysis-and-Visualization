const { Model } = require('objection');

class Summary_Timeline extends Model {

  static get tableName() {
      return 'summary_timeline';
  }
}

exports.Summary_Timeline = Summary_Timeline;
