const { Model } = require('objection');

class Applications extends Model {

  static get tableName() {
      return 'applications';
  }
}

exports.Applications = Applications;
