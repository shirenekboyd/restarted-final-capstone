const knex = require("../db/connection");
const tableName = "reservations";

//then might not be needed, review later when i understand functionality
function list(reservation_date) {
  return knex(tableName)
    .where("reservation_date", reservation_date)
    .orderBy("reservation_time")
}

function create(newReservation) {
  return knex(tableName)
    .insert(newReservation, '*')
    .then((createdReservations) => createdReservations[0])
}

// function read(reservation_id){
//   return knex(tableName)
//     .where("reservation_id", reservation_id)
//     .first();
// }

// function update(reservation) {
//   return knex(tableName)
//     .where({ reservation_id: reservation.reservation_id })
//     .update(reservation, "*")
//     .then((records) => records[0]);
// }

// function status(reservation) {
//   update(reservation);
//   return validStatus(reservation);
// }

// function validStatus(reservation) {
//   if (["booked", "seated", "finished", "cancelled"].includes(reservation.status)) {
//     return reservation;
//   }
//   const error = new Error(
//     `Invalid status:"${reservation.status}"`
//   );
//   error.status = 400;
//   throw error;
// }

// function search(mobile_number) {
//   return knex(tableName)
//     .whereRaw(
//       "translate(mobile_number, '() -', '') like ?",
//       `%${mobile_number.replace(/\D/g, "")}%`
//     )
//     .orderBy("reservation_date");
// }

module.exports = {
  list,
  create,
  // read,
  // status,
  // search
};
  