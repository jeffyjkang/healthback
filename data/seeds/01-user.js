exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        { id: 1, username: "billy", password: "billy" },
        { id: 2, username: "jefe", password: "jefe" }
      ]);
    });
};
