
//app_name,screen_name,vehicle_id,timestamp

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("active_screens").del()
    .then(function () {
      // Inserts seed entries
      return knex("active_screens").insert([
        {
          app_name: "7e67ac23-5230-4c1e-92ad-a3df62918160",
          screen_name: "com.delphihome.aptiv",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:27-05"
        },
        {
          app_name: "99f63c90-3bc3-44d7-a1e7-9abeda0d5dfd",
          screen_name: "com.mediaplayer.android",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:24-05"
        },
        {
          app_name: "184f012a-462c-4a00-bdac-24c33040667b",
          screen_name: "radio",
          vehicle_id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          timestamp: "2019-01-08 13:22:21-05"
        },
        {
          app_name: "e8d49385-7b5c-43d0-8ad5-29b6b7181abc",
          screen_name: "LauncherApplication",
          vehicle_id: "19847f57-65d7-4970-8117-4b1b57d2d1ab",
          timestamp: "2019-01-08 10:08:07-05"
        }
      ]);
  });
};
