
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("applications").del()
    .then(function () {
      // Inserts seed entries
      return knex("applications").insert([
        {
          id: "7e67ac23-5230-4c1e-92ad-a3df62918160",
          name: "media_player",
          version:"1"
        },
        {
          id: "99f63c90-3bc3-44d7-a1e7-9abeda0d5dfd",
          name: "media_player",
          version:"1.2"
        },
        {
          id: "184f012a-462c-4a00-bdac-24c33040667b",
          name: "media_player",
          version:"1.3"
        }
      ]);
  });
};
