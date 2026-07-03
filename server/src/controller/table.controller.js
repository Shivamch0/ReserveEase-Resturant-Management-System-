import { Table } from "../model/table.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllTables = asyncHandler(async (req ,res) => {
    const tables = await Table.find().sort({tableNumber : 1});

    return res.status(200).json(new ApiResponse(200 , {data : tables} , "tables fetched successfully..."))
})

export const getTableById = asyncHandler(async(req , res) => {
    const tableId = req.params.id;
    if(!tableId){
        throw new ApiError(400 , "Table found...")
    }

    const table = await Table.findById(tableId);
    if(!table){
        throw new ApiError(400 , "Table is not found...")
    }

    return res.status(200).json(new ApiResponse(200 , {data : table} , "Table fetched successfully..."))

})

export const addTable = asyncHandler(async (req , res) => {
    const tableNumber = Number(req.body.tableNumber);
    const capacity = Number(req.body.capacity);

    if(!Number.isNaN(tableNumber) || !Number.isNaN(capacity)){
        throw new ApiError(400 , "Table number and capacity must be valid numbers...")
    }

     if (!Number.isInteger(capacity) || capacity < 1 || capacity > 20) {
    throw new ApiError(
      400,
      "Table capacity must be an integer between 1 and 20."
    );
  }

    const existedTable = await Table.findOne({tableNumber});
    if(existedTable){
        throw new ApiError(409 , "Table with this number already exists...")
    }

    const table = await Table.create({
        tableNumber,
        capacity,
    });

    return res.status(201).json(new ApiResponse(201 ,  table , "New Table Created Successfully..."))

})