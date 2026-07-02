import { Schema , model } from "mongoose";

const tableSchema = new Schema({
    tableNumber : {
        type : Number,
        unique : true,
        required : true
    },
    capacity : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    }
} , {timestamps : true})

export const Table = model("Table" , tableSchema)