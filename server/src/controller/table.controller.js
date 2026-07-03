import { Table } from "../model/table.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllTables = asyncHandler(async (req, res) => {
  const tables = await Table.find().sort({ tableNumber: 1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: tables }, "tables fetched successfully..."),
    );
});

export const getTableById = asyncHandler(async (req, res) => {
  const tableId = req.params.id;
  if (!tableId) {
    throw new ApiError(400, "Table found...");
  }

  const table = await Table.findById(tableId);
  if (!table) {
    throw new ApiError(400, "Table is not found...");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: table }, "Table fetched successfully..."),
    );
});

export const addTable = asyncHandler(async (req, res) => {
  const tableNumber = Number(req.body.tableNumber);
  const capacity = Number(req.body.capacity);

  if (Number.isNaN(tableNumber) || Number.isNaN(capacity)) {
    throw new ApiError(
      400,
      "Table number and capacity must be valid numbers...",
    );
  }

  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 20) {
    throw new ApiError(
      400,
      "Table capacity must be an integer between 1 and 20.",
    );
  }

  const existedTable = await Table.findOne({ tableNumber });
  if (existedTable) {
    throw new ApiError(409, "Table with this number already exists...");
  }

  const table = await Table.create({
    tableNumber,
    capacity,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, table, "New Table Created Successfully..."));
});

export const updateTables = asyncHandler(async (req, res) => {
  const { id: tableId } = req.params;

  if (!tableId) {
    throw new ApiError(400, "Table ID is required.");
  }

  const existingTable = await Table.findById(tableId);

  if (!existingTable) {
    throw new ApiError(404, "Table not found.");
  }

  const updateData = {};

  if (req.body.capacity !== undefined) {
    const capacity = Number(req.body.capacity);

    if (Number.isNaN(capacity)) {
      throw new ApiError(400, "Capacity must be a valid number.");
    }

    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 20) {
      throw new ApiError(
        400,
        "Capacity must be an integer between 1 and 20."
      );
    }

    updateData.capacity = capacity;
  }

  if (req.body.isActive !== undefined) {
    if (typeof req.body.isActive !== "boolean") {
      throw new ApiError(400, "isActive must be a boolean.");
    }

    updateData.isActive = req.body.isActive;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No fields provided for update.");
  }

  const updatedTable = await Table.findByIdAndUpdate(
    tableId,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedTable,
      "Table updated successfully."
    )
  );
});
