import { Router } from "express";
import { verifyJWT , verifyAdmin } from "../middleware/auth.middleware.js";
import { createReservation } from "../controller/reservation.controller.js";

const router = Router();

router.route("/").post(verifyJWT , createReservation)

export default router