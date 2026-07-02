import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Table } from "../model/table.model.js";
import { connectDB } from "../config/db.js";

const tables = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 2 },
  { tableNumber: 3, capacity: 4 },
  { tableNumber: 4, capacity: 4 },
  { tableNumber: 5, capacity: 6 },
  { tableNumber: 6, capacity: 8 },
];

const seedTable = async () => {
  try {
    await connectDB();

    const tableCount = await Table.countDocuments();

    if (tableCount > 0) {
      console.log("Tables already exists...");
      process.exit(0);
    }

    await Table.insertMany(tables);

    console.log("Tables seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
};

seedTable();
