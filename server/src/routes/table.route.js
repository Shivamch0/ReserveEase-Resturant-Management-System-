import { Router } from "express";
import { getAllTables , getTableById , addTable , updateTables , deactivateTable , permanentDeleteTable } from "../controller/table.controller.js";
import { verifyJWT , verifyAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllTables).post( verifyAdmin , addTable);

router.route("/:id").get(getTableById).patch( verifyAdmin , updateTables).delete( verifyAdmin , permanentDeleteTable);

router.route("/:id/deactivate").patch( verifyAdmin , deactivateTable)

export default router