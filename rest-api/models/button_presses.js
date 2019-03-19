const { Model } = require('objection');

class Button_Presses extends Model {

  static get tableName() {
      return 'button_presses';
  }
}

exports.Button_Presses = Button_Presses;
