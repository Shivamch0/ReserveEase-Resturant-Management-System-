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

  let finalEndTime = endTime;
  if(!finalEndTime){
    const [hours , minutes] = startTime.split(":").map(Number);
    
    const totalMinutes = hours * 60 + minutes + 90;

    const endHours = Math.floor(totalMinutes / 60) % 24;

    const endMinutes = totalMinutes % 60;
    finalEndTime = `${endHours.toString().padStart(2,"0")}:${endMinutes.toString().padStart(2, "0")}`;
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
      return startTime < reserve.endTime && finalEndTime > reserve.startTime;
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
    customer: user._id,
    table: assignedTable._id,
    reservationDate,
    startTime,
    endTime : finalEndTime,
    guests: Number(guests),
    notes: notes || "",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, reservation, "Table reserved successfully..."));
});

export const getCustomerReservations = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Invalid User...");
  }

  const reservations = await Reservation.find({
    customer : user._id
  })

  return res.status(200).json(new ApiResponse(200 , reservations , "Customer reservations fetched successfully..."))
});

export const getAllReservations = asyncHandler(async(req , res) => {
    const reservations = await Reservation.find().sort({reservationDate: 1});
    return res.status(200).json(new ApiResponse(200 , reservations , "All reservations fetched successfully..."))
})

export const updateBookingStatus = asyncHandler(async(req , res) => {
    const user = req.user;
    const { id : reservationId } = req.params;
    if(!reservationId){
        throw new ApiError(400 , "Reservation Id is required...")
    }

    const { status } = req.body;

    const reservation = await Reservation.findById(reservationId);
    if(!reservation){
        throw new ApiError(404 , "Reservation is not found...");
    }

    if(user.role !== 'admin'){
        if(reservation.customer.toString() !== user._id.toString()){
            throw new ApiError(403 , "You can only modify your own reservations...")
        }
        if(status !== "Cancelled"){
            throw new ApiError(403 , "Customers are only allowed to cancel reservations....")
        }
    }

    reservation.status = status;
    await reservation.save();

    return res.status(200).json(new ApiResponse(200 , reservation , "Reservation status updated successfully..."));

})