const db = require("../../data/dbConfig");
module.exports = {
  get: id => {
    let query = db("user");
    if (id) {
      query = db("user").where("user.id", id);
    }
    return query;
  }
};
