const knex = require("../db/connection");
const tableName = "tables";

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name");
  }

  function update({table_id, reservationId}) {
    return knex("tables")
      .select("*")
      .where({ table_id })
      .update({ reservation_id: reservationId })
      .returning("*")
      .then((data) => data[0]);
  }

  module.exports = {
    //create,
    list,
    update,
    // read,
    // clear,
  };
  