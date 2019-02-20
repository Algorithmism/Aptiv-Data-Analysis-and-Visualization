
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("vehicles").del()
    .then(function () {
      // Inserts seed entries
      return knex("vehicles").insert([
        {
          id: "6f1c16d1-4ca8-4621-a72a-cb6add087151",
          name: "Abram's Vehicle",
          created_at: "2019-01-08 13:22:18.293-05",
          updated_at: "2019-01-08 13:22:18.293-05"
        },
        {
          id: "19847f57-65d7-4970-8117-4b1b57d2d1ab",
          name: "initial-test",
          created_at: "2019-01-08 13:22:18.293-05",
          updated_at: "2019-01-08 13:22:18.293-05"
        },
        {
          id: "213e721f-f5c0-436c-9549-1f3521515345",
          name: "My Vehicle A",
          created_at: "2019-01-08 13:22:18.293-05",
          updated_at: "2019-01-08 13:22:18.293-05"
        }
      ]);
  });
};

//test
