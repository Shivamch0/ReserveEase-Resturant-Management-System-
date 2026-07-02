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
    const { tableNumber , capacity } = req.body;
    if(!tableNumber || !capacity){
        throw new ApiError(400 , "Fill the required fields...")
    }
    if(capacity <= 0){
        throw new ApiError(400 ,"The should be at least 1...")
    }

    const existedTable = await Table.findOne({tableNumber});
    if(existedTable){
        throw new ApiError(409 , "Table with this number is already exists...")
    }

    const table = await Table.create({
        tableNumber,
        capacity,
        isActive
    });

    return res.status(201).json(new ApiResponse(201 , {data : table} , "New Table Created..."))

})