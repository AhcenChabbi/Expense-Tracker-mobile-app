import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transactionsController";

const router = Router();
router.post("/", createTransaction);
router.get("/:userId", getTransactionsByUserId);
router.get("/summary/:userId", getSummaryByUserId);
router.delete("/:id", deleteTransaction);
export default router;
