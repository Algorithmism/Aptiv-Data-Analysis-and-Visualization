const { Model } = require('objection');

class App_Usages extends Model {

  static get tableName() {
      return 'app_usages';
  }
}

exports.App_Usages = App_Usages;
