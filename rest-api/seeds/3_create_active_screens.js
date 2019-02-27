
//app_name,screen_name,vehicle_id,timestamp

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("active_screens").del()
    .then(function () {
      // Inserts seed entries
      return knex("active_screens").insert([
        {
          application_id: "7e67ac23-5230-4c1e-92ad-a3df62918160",
          screen_name: "com.delphihome.aptiv",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:27-05"
        },
        {
          application_id: "99f63c90-3bc3-44d7-a1e7-9abeda0d5dfd",
          screen_name: "com.mediaplayer.android",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:24-05"
        },
        {
          application_id: "184f012a-462c-4a00-bdac-24c33040667b",
          screen_name: "radio",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:21-05"
        }
      ]);
  });
};
