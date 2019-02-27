
//app_name,screen_name,vehicle_id,timestamp

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("app_state_changes").del()
    .then(function () {
      // Inserts seed entries
      return knex("app_state_changes").insert([
        //app_name,new_state,vehicle_id,timestamp
        {
          //com.android.car.radio,INITIALIZING,6f1c16d1-4ca8-4621-a72a-cb6add087151,2019-01-08 13:25:21-05
          
        }
      ]);
  });
};
