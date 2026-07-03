import { Router } from "express";
import { getAllTables , getTableById , addTable , updateTables , deactivateTable , permanentDeleteTable } from "../controller/table.controller.js";
import { verifyJWT , verifyAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

router.route("/").get(getAllTables).post(addTable);

router.route("/:id").get(getTableById).patch(updateTables).delete(permanentDeleteTable);

router.route("/:id/deactivate").patch(deactivateTable)

export default router