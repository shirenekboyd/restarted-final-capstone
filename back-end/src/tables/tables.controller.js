const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data });
    
};

async function update(req, res) {
    const updatedTable = {
      reservationId: req.body.data.reservation_id,
      tableId: req.params.table_id,
    };
    let data = await service.update(updatedTable);
    res.json({ data });
  }

  /**
 * V a l i d a t i o n
 */

  // if reservation.status === booked

module.exports = {
    list: asyncErrorBoundary(list),
    update: asyncErrorBoundary(update)
};