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
      min: 1,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled" , "Completed"],
      default: "Booked",
    },
    notes : {
      type : String,
      trim : true
    }
  },
  { timestamps: true },
);

reservationSchema.index({
  table: 1,
  reservationDate: 1,
});


reservationSchema.index({
  customer: 1,
});
export const Reservation = model("Reservation", reservationSchema);
