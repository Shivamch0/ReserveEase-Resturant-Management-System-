import { Reservation } from "../model/reservation.model.js";
import { User } from "../model/user.model.js";
import { Table } from "../model/table.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReservation = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Invalid User...");
  }

  const { reservationDate, startTime, endTime, guests, notes } = req.body;

  if (!reservationDate || !startTime || !guests) {
    throw new ApiError(400, "Fill all the required fieilds...");
  }

  const availableTables = await Table.find({ isActive: true });
  if (availableTables.length === 0) {
    throw new ApiError(400, "No Available Tables found...");
  }

  const tables = availableTables
    .filter((table) => table.capacity >= guests)
    .sort((a, b) => a.capacity - b.capacity);
  if (tables.length === 0) {
    throw new ApiError(400, "No Available Tables found...");
  }

  let assignedTable = null;

  for (const table of tables) {
    const reservedTables = await Reservation.find({
      table: table._id,
      reservationDate,
      status: "Booked",
    });

    const hasOverlap = reservedTables.some((reserve) => {
      return startTime < reserve.endTime && endTime > reserve.startTime;
    });

    if (!hasOverlap) {
      assignedTable = table;
      break;
    }
  }

  if (!assignedTable) {
    throw new ApiError(
      400,
      "No Tables of sufficient capacity are avaliable for the selected data and time slot",
    );
  }

  const reservation = await Reservation.create({
    customer : user._id,
    table : assignedTable._id,
    reservationDate,
    startTime,
    endTime,
    guests : Number(guests),
    notes : notes || ""
  })

  return res.status(201).json(new ApiResponse(201 , reservation ,  "Table reserved successfully..."))
});
