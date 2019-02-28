
//app_name,screen_name,vehicle_id,timestamp

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("button_presses").del()
    .then(function () {
      // Inserts seed entries
      return knex("button_presses").insert([
        //screen_name,button_name,vehicle_id,timestamp
        {
          screen_name: "com.delphihome.aptiv",
          button_name: "my button y",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:24-05"
        },
        {
          screen_name: "com.delphihome.aptiv",
          button_name: "my button x",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:21-05"
        },
        {
          screen_name: "com.android.systemui/null",
          button_name: "Home",
          vehicle_id: "19847f57-65d7-4970-8117-4b1b57d2d1ab",
          timestamp: "2019-01-08 10:08:07-05"
        }
      ]);
  });
};
