import { Router } from "express";
import { verifyJWT , verifyAdmin } from "../middleware/auth.middleware.js";
import { createReservation , getAllReservations, getCustomerReservations , updateBookingStatus } from "../controller/reservation.controller.js";

const router = Router();

router.use(verifyJWT )

router.route("/").get(getCustomerReservations).post(createReservation);

router.route("/:id").patch(updateBookingStatus)

router.route("/all-reservations").get(verifyAdmin , getAllReservations)

export default router