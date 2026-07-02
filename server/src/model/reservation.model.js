import { Schema, model } from "mongoose";

const reservationSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true },
);

export const Reservation = model("Reservation", reservationSchema);
